import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';
import TreeLoaderStore from './TreeLoaderStore.jsx';
import {EventEmitter} from 'events';
import $ from "jquery";

const store = {
    parentDn: '',
    childDns: []
};

class TreeSelectedStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.DROPDOWNS, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(TreeEvents.DROPDOWNS, callback);
    }

    initFirstDropDowns(dn) {
        store.parentDn = dn;
    }

    initSecondDropDowns(dn) {
        const url = TreeLoaderStore.getDatas().url;
        $.ajax({
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            type: 'GET',
            data: {dn: dn},
            success: function (data, textStatus, jqXHR) {
                store.childDns = data.dns;
                this.emit(TreeEvents.DROPDOWNS);
            }.bind(this),
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
            }
        });
    }

    getFirstDropDowns() {
        return store.parentDn;
    }

    getSecondDropDowns() {
        return store.childDns;
    }

}

const treeSelectedStore = new TreeSelectedStore();

export default treeSelectedStore;

AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.eventName) {
        case TreeEvents.DROPDOWNS:
            treeSelectedStore.initFirstDropDowns(action.dn);
            treeSelectedStore.initSecondDropDowns(action.dn);
            break;
        default:
            break;
    }
});