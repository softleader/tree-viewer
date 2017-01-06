import React, {Component} from 'react';
import {TreeAction} from '../actions/TreeAction.jsx';
import TreeSelectedStore from '../stores/TreeSelectedStore.jsx';
import es6BindAll from "es6bindall";
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';


class ChildDownDrops extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "getState",
        ]);
        this.state = {
            dns: [],
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
            dns: TreeSelectedStore.getSecondDropDowns(),
        };
    }

    //TODO
    xxx(dn) {
        console.log(dn);
    }

    render() {
        return (
            <SplitButton title="Child" id="second-drop-downs">
                {
                    this.state.dns.map((dn, i) => {
                        return <MenuItem key={i} eventKey={dn} onSelect={this.xxx}>{dn}</MenuItem>
                    })
                }
            </SplitButton>
        );
    }
}


export default ChildDownDrops;