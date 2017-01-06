import React, {Component} from 'react';
import {TreeAction} from '../actions/TreeAction.jsx';
import TreeHeaderStore from '../stores/TreeHeaderStore.jsx';
import TreeLoaderStore from '../stores/TreeLoaderStore.jsx';
import es6BindAll from "es6bindall";
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import ParentDownDrops from './ParentDownDrops.jsx';
import ChildDownDrops from './ChildDownDrops.jsx';


class TreeHeader extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "handleInputChange",
            "onAdd",
            "onDelete",
            "onSelect",
        ]);
        this.state = {
            dn: '',
        };
    }

    componentDidMount() {
        TreeLoaderStore.initTree(this.props.context);
        TreeHeaderStore.addChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            dn: TreeHeaderStore.getDn(),
        });
    }

    handleInputChange(event) {
        this.setState({
            dn: event.target.value,
        });
    }

    onAdd() {
        TreeAction.addDN(this.state.dn);
        this.setState({
            dn: '',
        });
    }

    onDelete() {
        TreeAction.deleteDN(this.state.dn);
        this.setState({
            dn: '',
        });
    }

    onSelect() {
        TreeAction.dropDownsInit(this.state.dn);
    }

    render() {
        return (
            <div>
                <h1>{this.props.context.name}</h1>
                <div>
                    <FormGroup>
                        <FormControl value={this.state.dn} type="text" bsSize="sm"
                                     autoFocus placeholder="請輸入 DN" onChange={this.handleInputChange}/>
                    </FormGroup>
                    <ButtonToolbar>
                        <Button onClick={this.onAdd} bsStyle="primary">新增</Button>
                        <Button onClick={this.onDelete} bsStyle="danger">刪除</Button>
                        <Button onClick={this.onSelect}>查詢</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

TreeHeader.defaultProps = {
    name: 'Tree',
};

export default TreeHeader;