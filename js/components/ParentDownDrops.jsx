import React, {Component} from 'react';
import {TreeAction} from '../actions/TreeAction.jsx';
import TreeSelectedStore from '../stores/TreeSelectedStore.jsx';
import es6BindAll from "es6bindall";
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';


class ParentDownDrops extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "getState",
        ]);
        this.state = {
            dns: '',
        };
    }

    componentDidMount() {
        TreeSelectedStore.addChangeListener(this.onChange);
    }

    onChange() {
        this.setState(this.getState());
    }

    getState() {
        return {
            dns: TreeSelectedStore.getFirstDropDowns(),
        };
    }

    //TODO
    xxx(dn) {
        console.log(dn);
    }

    render() {
        return (
            <SplitButton title="Parent" id="first-drop-downs">
                <MenuItem eventKey={this.state.dns} onSelect={this.xxx}>{this.state.dns}</MenuItem>
            </SplitButton>
        );
    }
}

export default ParentDownDrops;