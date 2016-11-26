import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import { TreeEvents } from '../constants/Events.jsx';

export const TreeAction = {
  addDN(context) {
    AppDispatcher.handleViewAction({
      eventName: TreeEvents.TREE_ADD,
      context: context
    });
  },

  deleteDN(context) {
    AppDispatcher.handleViewAction({
      eventName: TreeEvents.TREE_DELETE,
      context: context
    });
  },

  displayDN(context) {
    AppDispatcher.handleViewAction({
      eventName: TreeEvents.DN_DISPLAY,
      context: context
    });
  },
};