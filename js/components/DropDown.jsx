import React, {Component} from 'react';
import {TreeAction} from '../actions/TreeAction.jsx';
import TreeSelectedStore from '../stores/TreeSelectedStore.jsx';
import es6BindAll from "es6bindall";
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';


class DropDown extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "getState",
        ]);
        this.state = {
            dropDowns: []
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
            dropDowns: TreeSelectedStore.getDropDowns(),
        };
    }

    initChildDownDrop(parentDn) {
        TreeAction.initChildDropDowns(parentDn);
        TreeAction.displayDN(parentDn);
    }

    render() {
        return (
            <div>
                {
                    this.state.dropDowns.map((arr, i) => {
                        return (
                            <SplitButton key={i} title="DropDown" id={"drop-downs" + i}>
                                {
                                    arr.map((dn, j) => {
                                        return (
                                            <MenuItem key={j} eventKey={dn}
                                                      onSelect={this.initChildDownDrop}>{dn}</MenuItem>
                                        )
                                    })
                                }
                            </SplitButton>
                        )
                    })
                }
            </div>
        );
    }
}

export default DropDown;