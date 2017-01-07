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

    initParentDropDowns(dn) {
        // 將 parent 的 dn 從陣列的前面放進去，將後面的切掉
        // 因為 splice 會修改原先的陣列，因此利用 splice
        store.dropDowns.splice(0);
        store.dropDowns.push([dn]);
        this.emit(TreeEvents.DROPDOWNS);
    }

    initChildDropDowns(dn) {
        const url = TreeLoaderStore.getDatas().url;
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            data: {dn: dn},
            success: function (data, textStatus, jqXHR) {
                // 目前的傳入的 dn 是 match 到第幾個 dropDown
                const index = store.dropDowns.findIndex(arr =>
                    arr.find(v => v === dn)
                )
                store.dropDowns.splice(index + 1);
                store.dropDowns.push(data.dns);
                this.emit(TreeEvents.DROPDOWNS);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });
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
            treeSelectedStore.initParentDropDowns(action.dn);
            break;
        case TreeEvents.CHILDDROPDOWNS:
            treeSelectedStore.initChildDropDowns(action.dn);
            break;
        default:
            break;
    }
});