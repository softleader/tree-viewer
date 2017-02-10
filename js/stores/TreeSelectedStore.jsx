import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';
import TreeLoaderStore from './TreeLoaderStore.jsx';
import {EventEmitter} from 'events';
import $ from "jquery";

const store = {
    dropDowns: []
};

class TreeSelectedStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.DROPDOWNS, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(TreeEvents.DROPDOWNS, callback);
    }

    /**
     * 利用傳入的 dn 初始化下拉式選單
     * @param dn
     */
    initDropDowns(dn) {
        if (dn) {
            store.dropDowns = [[dn]];
            this.initChildDropDowns(dn);
        } else {
            return;
        }
    }
    /**
     * initial tree 節點的下拉式選單：
     * 搜尋此 dn 底下的節點。
     * ajax 由使用者傳入：
     * 利用 JSON 的 method 將傳入的物件轉成字串後再轉回物件(deep clone)，以免被 referrence 到
     * @param dn
     */
    initChildDropDowns(dn) {
        let getAjaxObj = TreeLoaderStore.getTreeConfig().getAjaxObj;
        let getObj = JSON.parse(JSON.stringify(getAjaxObj));
        getObj.data = getAjaxObj.data ? getAjaxObj.data : {dn: dn};

        getObj.success = function (data, textStatus, jqXHR) {
            getAjaxObj.success(data, textStatus, jqXHR);
            // 比對目前的傳入的 dn 是 match 到第幾個下拉式選單（第幾個節點）
            let index = store.dropDowns.findIndex(arr =>
                arr.find(v => v === dn)
            )
            // 將比對到節點底下的下拉式選單從陣列刪除，並且將此 dn 底下的 dn 陣列放入
            store.dropDowns.splice(index + 1);
            if(data.dns) {
                store.dropDowns.push(data.dns);
            }
            this.emit(TreeEvents.DROPDOWNS);
        }.bind(this);
        $.ajax(getObj);
    }

    getDropDowns() {
        return store.dropDowns;
    }


}

const treeSelectedStore = new TreeSelectedStore();

export default treeSelectedStore;

AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.eventName) {
        case TreeEvents.DROPDOWNS:
            treeSelectedStore.initDropDowns(action.dn);
            break;
        case TreeEvents.CHILDDROPDOWNS:
            treeSelectedStore.initChildDropDowns(action.dn);
            break;
        default:
            break;
    }
});