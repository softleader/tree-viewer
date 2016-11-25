import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import { TreeEvents } from '../constants/Events.jsx';

export const TreeAction = {
  addDN(context) {
    AppDispatcher.handleViewAction({
      eventName: TreeEvents.TREE_LIST,
      context: context
    });
  },
};