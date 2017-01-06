import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';

export const TreeAction = {
    initTree(context) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.TREE_INIT,
            context: context
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

    dropDownsInit(dn) {
        AppDispatcher.handleViewAction({
            eventName: TreeEvents.DROPDOWNS,
            dn: dn
        });
    },

};