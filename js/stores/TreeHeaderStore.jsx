import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {TreeEvents} from '../constants/Events.jsx';
import {EventEmitter} from 'events';

const store = {
    dn: ''
};

class TreeHeaderStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(TreeEvents.DN_DISPLAY, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(TreeEvents.DN_DISPLAY, callback);
    }

    setDn(dn) {
        store.dn = dn;
    }

    getDn() {
        return store.dn;
    }
}

const treeHeaderStore = new TreeHeaderStore();

export default treeHeaderStore;

AppDispatcher.register(payload => {
    const action = payload.action;

    switch (action.eventName) {
        case TreeEvents.DN_DISPLAY:
            treeHeaderStore.setDn(action.dn);
            treeHeaderStore.emit(TreeEvents.DN_DISPLAY);
            break;
        default:
            break;
    }
});