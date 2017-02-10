import React, {Component} from 'react';
import {TreeAction} from '../actions/TreeAction.jsx';
import TreeSelectedStore from '../stores/TreeSelectedStore.jsx';
import es6BindAll from "es6bindall";
import Dropdown from 'react-bootstrap/lib/Dropdown';
import Button from 'react-bootstrap/lib/Button';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import $ from "jquery";

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

    initChildDownDrop(parentObj) {
        let id = '#' + parentObj.splitButtonId;
        $(id).text(parentObj.dn);
        TreeAction.initChildDropDowns(parentObj.dn);
        TreeAction.displayDN(parentObj.dn);
    }

    displayDn() {
        TreeAction.displayDN(this);
    }

    render() {
        return (
            <div>
                {
                    this.state.dropDowns.map((arr, i) => {
                        return (
                            <Dropdown key={i} id={"drop-downs" + i}>
                                <Button id={"drop-downs-button" + i}
                                        onClick={this.displayDn.bind($('#drop-downs-button' + i).text() || arr[0])}>
                                    {arr[0]}
                                </Button>
                                <Dropdown.Toggle/>
                                <Dropdown.Menu className="super-colors">
                                    {
                                        arr.map((dn, j) => {
                                            return (
                                                <MenuItem key={j} eventKey={{dn: dn, splitButtonId: "drop-downs-button" + i}}
                                                          onSelect={this.initChildDownDrop}>{dn}</MenuItem>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        )
                    })
                }
            </div>
        );
    }
}

export default DropDown;