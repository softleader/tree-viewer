import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';
import {EventEmitter} from 'events';
import $ from "jquery";

const store = {
    tree: [],

};

const treeConfig = {
    initTreeDatas: null,
    getAjaxObj: null,
    deleteAjaxObj: null,
    postAjaxObj: null,
};

class TreeLoaderStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.TREE_LIST, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(TreeEvents.TREE_LIST, callback);
    }

    initDatas(context) {
        treeConfig.initTreeDatas = context.initTreeDatas;
        treeConfig.url = context.url;
        treeConfig.dn = context.dn;
        treeConfig.getAjaxObj = context.getAjaxObj;
        treeConfig.deleteAjaxObj = context.deleteAjaxObj;
        treeConfig.postAjaxObj = context.postAjaxObj;
    }

    initTree() {
        treeConfig.initTreeDatas.forEach(dn => this.transformTreeArrayToObject(this.processDnToTreeArray(dn)));
    }

    /**
     * 新增節點：
     * 新增 tree 節點的 ajax 由使用者傳入。
     * 利用 JSON 的 method 將傳入的物件轉成字串後再轉回物件(deep clone)，以免被 referrence 到
     * @param dn
     */
    addTree(dn) {
        let postObj = JSON.parse(JSON.stringify(treeConfig.postAjaxObj));
        postObj.data = postObj.data ? postObj.data : JSON.stringify({dn: dn});

        postObj.success = function (data, textStatus, jqXHR) {
            treeConfig.postAjaxObj.success(data, textStatus, jqXHR);
            this.transformTreeArrayToObject(this.processDnToTreeArray(data.dn));
            this.emit(TreeEvents.TREE_LIST);
        }.bind(this);
        $.ajax(postObj);
    }

    /* 將 LDAP 的 DN 字串切成陣列，並且拿掉 RDN，只留 name，再從 domain 大的排到小
     ex: DN:uid=137,organizationName=technology department,dc=softleader,dc=com
     => [com,softleader,technology department,137]
     */
    processDnToTreeArray(dn) {
        let treeArr = dn.split(",");
        return treeArr.map((v, i, a) => {
            return v = {
                name: v.substr(v.indexOf("=") + 1),
                dn: treeArr.slice(i).toString()
            };
        }).reverse();
    }

    // 將 tree 的陣列轉換成自訂的物件格式後放入 store.tree 陣列
    transformTreeArrayToObject(treeArr) {
        // 若原本 store.tree 陣列裡面沒有任何資料，則將此次輸入 tree 陣列放入
        if (store.tree.length == 0) {
            let obj = this.createTreeObj(treeArr);
            if (obj) {
                store.tree.push(obj);
            }
        }
        // 若原本 store.tree 陣列裡面有資料，則將此次輸入 tree 陣列比對是否有相同路徑，
        // 比對到不同的再產生新物件放入
        else if (treeArr) {
            let tempArr = store.tree;
            // 已存在的陣列 match 到傳入的陣列第幾層
            let level;
            for (let i = 0; i < treeArr.length; i++) {
                for (let j = 0; j < tempArr.length; j++) {
                    if (tempArr[j].dn === treeArr[i].dn) {
                        tempArr = tempArr[j].nodes;
                        level = i;
                        break;
                    }
                }
            }
            let obj = this.createTreeObj(treeArr.slice(level + 1));
            if (obj) {
                tempArr.push(obj);
            }
        }
    }

    // 將 tree 陣列轉換成 treeview-react-bootstrap 規定的物件格式
    // name: 名字; dn: 完整路徑; nodes: 子節點
    createTreeObj(treeArr) {
        if (treeArr && treeArr.length > 0) {
            let obj = new Object();
            obj.name = treeArr[0].name;
            obj.dn = treeArr[0].dn;
            obj.nodes = [];

            if (treeArr.length > 1) {
                let tempObj = obj;
                for (let i = 1; i < treeArr.length; i++) {
                    let childObj = new Object();
                    childObj.name = treeArr[i].name;
                    childObj.dn = treeArr[i].dn;
                    childObj.nodes = [];
                    tempObj.nodes.push(childObj);
                    tempObj = childObj;
                    //                console.log(tempObj);
                }
            }
            return obj;
        }
    }

    /**
     * 刪除節點：
     * 刪除 tree 節點的 ajax 由使用者傳入。
     * 利用 JSON 的 method 將傳入的物件轉成字串後再轉回物件(deep clone)，以免被 referrence 到
     * @param dn
     */
    deleteTree(dn) {
        let deleteObj = JSON.parse(JSON.stringify(treeConfig.deleteAjaxObj));
        deleteObj.data = deleteObj.data ? deleteObj.data : JSON.stringify({dn: dn});
        deleteObj.success = function (data, textStatus, jqXHR) {
            treeConfig.deleteAjaxObj.success(data, textStatus, jqXHR);
            this.removeTree(store.tree, data.dn);
            this.emit(TreeEvents.TREE_LIST);
        }.bind(this);

        $.ajax(deleteObj);
    }

    /**
     * 移除 treeArr 陣列裡面的 dn 這個節點
     * @param treeArr
     * @param dn
     */
    removeTree(treeArr, dn) {
        for (let i = 0; i < treeArr.length; i++) {
            if (treeArr[i].nodes.length > 0) {
                this.removeTree(treeArr[i].nodes, dn);
            }
            if (treeArr[i].dn == dn) {
                treeArr.splice(i, 1);
            }
        }
        // console.log(store.tree);
    }

    getTree() {
        return store.tree;
    }

    getTreeConfig() {
        return treeConfig;
    }
}

const treeLoaderStore = new TreeLoaderStore();

export default treeLoaderStore;

AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.eventName) {
        case TreeEvents.TREE_INIT:
            treeLoaderStore.initDatas(action.context);
            treeLoaderStore.initTree();
            treeLoaderStore.emit(TreeEvents.TREE_LIST);
            break;
        case TreeEvents.TREE_ADD:
            treeLoaderStore.addTree(action.dn);
            break;
        case TreeEvents.TREE_DELETE:
            treeLoaderStore.deleteTree(action.dn)
        default:
            break;
    }
});