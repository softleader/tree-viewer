import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';
import {EventEmitter} from 'events';
import $ from "jquery";

const store = {
    tree: [],
};

class TreeListStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.TREE_LIST, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(TreeEvents.TREE_LIST, callback);
    }

    addTree(context) {
        $.ajax({
            url: context.url,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'POST',
            data: JSON.stringify({dn: context.dn}),
            success: function (data, textStatus, jqXHR) {
                // console.log(data.dn);
                this.transformTreeArrayToObject(this.processDnToTreeArray(data.dn));
                this.emit(TreeEvents.TREE_LIST);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });
    }

    /* 將 LDAP 的 DN 字串切成陣列，並且拿掉 RDN，只留 name，再從 domain 大的排到小
     ex: DN:uid=137,organizationName=technology department,dc=softleader,dc=com
     => [com,softleader,technology department,137]
     */
    processDnToTreeArray(dn) {
        var treeArr = dn.split(",");
        treeArr.forEach((v, i, a) => {
            // console.log("index " + i + ", value: " + v);
            if (v.trim().length == 0) {
                treeArr = null;
                return;
            }
            a[i] = {
                name: v.substr(v.indexOf("=") + 1),
                dn: treeArr.slice(i).toString()
            };
        })
        if (treeArr) {
            treeArr.reverse();
        }
        return treeArr;
    }

    // 將 tree 的陣列轉換成自訂的物件格式後放入 store.tree 陣列
    transformTreeArrayToObject(treeArr) {
        // 若原本 store.tree 陣列裡面沒有任何資料，則將此次輸入 tree 陣列放入
        if (store.tree.length == 0) {
            var obj = this.createTreeObj(treeArr);
            if (obj) {
                store.tree.push(obj);
            }
        }
        // 若原本 store.tree 陣列裡面有資料，則將此次輸入 tree 陣列比對是否有相同路徑，
        // 比對到不同的再產生新物件放入
        else if (treeArr) {
            var tempArr = store.tree;
            var i;
            for (i = 0; i < treeArr.length; i++) {
                var isMatch = false;
                for (var j = 0; j < tempArr.length; j++) {
                    if (tempArr[j].type === treeArr[i].name) {
                        tempArr = tempArr[j].nodes;
                        isMatch = true;
                        break;
                    }
                }
                if (!isMatch) {
                    break;
                }
            }
            var obj = this.createTreeObj(treeArr.slice(i));
            if (obj) {
                tempArr.push(obj);
            }

        }
    }

    // 將 tree 陣列轉換成 treeview-react-bootstrap 規定的物件格式
    // type: 名字; dn: 完整路徑; nodes: 子節點
    createTreeObj(treeArr) {
        if (treeArr && treeArr.length > 0) {
            var obj = new Object();
            obj.type = treeArr[0].name;
            obj.dn = treeArr[0].dn;
            obj.nodes = [];

            if (treeArr.length > 1) {
                var tempObj = obj;
                for (var i = 1; i < treeArr.length; i++) {
                    var childObj = new Object();
                    childObj.type = treeArr[i].name;
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

    deleteTree(context) {
        $.ajax({
            url: context.url,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'DELETE',
            data: JSON.stringify({dn: context.dn}),
            success: function (data, textStatus, jqXHR) {
                if(data.isDelete) {
                    this.removeTree(store.tree, data.dn);
                    this.emit(TreeEvents.TREE_LIST);
                }
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });
    }

    removeTree(treeArr, dn) {
        for (var i = 0; i < treeArr.length; i++) {
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
}

const treeListStore = new TreeListStore();

export default treeListStore;

AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.eventName) {
        case TreeEvents.TREE_ADD:
            treeListStore.addTree(action.context);
            break;
        case TreeEvents.TREE_DELETE:
            treeListStore.deleteTree(action.context)
        default:
            break;
    }
});