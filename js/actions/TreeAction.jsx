import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';

export const TreeAction = {
    initTree(context) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.TREE_INIT,
            context: context
        });
    },

    initTreeDatas(dataArray) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.TREE_DATAS_INIT,
            dataArray: dataArray
        });
    },

    addDN(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.TREE_ADD,
            dn: dn
        });
    },

    deleteDN(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.TREE_DELETE,
            dn: dn
        });
    },

    displayDN(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.DN_DISPLAY,
            dn: dn
        });
    },

    initParentDropDowns(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.DROPDOWNS,
            dn: dn
        });
    },

    initChildDropDowns(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.CHILDDROPDOWNS,
            dn: dn
        });
    },

};