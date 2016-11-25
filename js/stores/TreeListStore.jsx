import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import { TreeEvents } from '../constants/Events.jsx';
import { EventEmitter } from 'events';

const store = {
    tree: [],
    editing: false,
};

class TreeListStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.TREE_LIST, callback);
    }
    removeChangeListener(callback) {
        this.removeListener(TreeEvents.TREE_LIST, callback);
    }

    /* 將 LDAP 的 DN 字串切成陣列，並且拿掉 RDN，只留 name，再從 domain 大的排到小
        ex: DN:uid=137,organizationName=technology department,dc=softleader,dc=com
        => [com,softleader,technology department,137]
     */
    processDnToTreeArray(dn) {
        var treeArr = dn.split(",");
        treeArr.forEach((v, i, a) => {
            console.log("index " + i + ", value: " + v);
            if(v.trim().length == 0) {
                treeArr = null;
                return;
            }
            a[i] = {
                arr : v.substr(v.indexOf("=") + 1),
                dn : treeArr.slice(i).toString()
            };
        })
        if(treeArr){
            treeArr.reverse();
        }
        return treeArr;
    }

    // 將 tree 的陣列轉換成自訂的物件格式後放入 store.tree 陣列
    transformTreeArrayToObject(treeArr) {
        // 若原本 store.tree 陣列裡面沒有任何資料，則將此次輸入 tree 陣列放入
        if (store.tree.length == 0) {
            var obj = this.createTreeObj(treeArr);
            if(obj) {
               store.tree.push(obj);
            }
        } 
        // 若原本 store.tree 陣列裡面有資料，則將此次輸入 tree 陣列比對是否有相同路徑，
        // 比對到不同的再產生新物件放入
        else if (treeArr) {
            var tempArr = store.tree;
            var i;
            for (i = 0; i < treeArr.length; i++) {
                // console.log(treeArr[i]);
                var isMatch = false;
                for (var j = 0; j < tempArr.length; j++) {
                    // console.log("  " + tempArr[j].type);
                    if (tempArr[j].type === treeArr[i].arr) {
                        tempArr = tempArr[j].nodes;
                        isMatch = true;
                        break;
                    }
                }
                if(!isMatch) {
                    break;
                }
            }
            var obj = this.createTreeObj(treeArr.slice(i));
            if(obj) {
                tempArr.push(obj);
            }

        }
        //store.dns.push();
    }

     // 將 tree 陣列轉換成 treeview-react-bootstrap 規定的物件格式
    createTreeObj(treeArr) {
        if(treeArr && treeArr.length > 0) {
            var obj = new Object();
            obj.type = treeArr[0].arr;
            obj.dn = treeArr[0].dn;
            obj.nodes = [];

            if (treeArr.length > 1) {
                var tempObj = obj;
                for (var i = 1; i < treeArr.length; i++) {
                    var childObj = new Object();
                    childObj.type = treeArr[i].arr;
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
    getTree() {
        return store.tree;
    }
}

const treeListStore = new TreeListStore();

export default treeListStore;

AppDispatcher.register(payload => {
	const action = payload.action;

	switch(action.eventName) {
		case TreeEvents.TREE_LIST:
			treeListStore.transformTreeArrayToObject(treeListStore.processDnToTreeArray(action.context));
            treeListStore.emit(TreeEvents.TREE_LIST);
			break;
		default:
			break;
	}
});