import React, {Component} from 'react';
import TreeLoaderStore from '../stores/TreeLoaderStore.jsx';
import TreeView from 'react-treeview';
import {TreeAction} from '../actions/TreeAction.jsx';
import es6BindAll from "es6bindall";
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';


class TreeList extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "getState",
        ]);
        this.state = {
            tree: [],
        };
    }

    componentDidMount() {
        TreeLoaderStore.addChangeListener(this.onChange);
        TreeAction.initTree(this.props.context);
    }

    onChange() {
        this.setState(this.getState());
    }

    showDn() {
        TreeAction.displayDN(this.dn);
        // TreeAction.initParentDropDowns(this.dn);
    }

    getState() {
        return {
            tree: TreeLoaderStore.getTree(),
        };
    }

    handleInputChange(event) {
        this.rdn = event.target.value;
    }

    addOrganization() {
        TreeAction.displayDN('ou=' + this.rdn + ',' + this.dn);
    }

    addMember() {
        TreeAction.displayDN('uid=' + this.rdn + ',' + this.dn);
    }

    drawTree(tree) {
        return tree.map((node, i) => {
            let dn = node.dn;
            let type = node.type;
            let name = node.name;
            let popoverClick = (
                <Popover id={"popover-trigger-click" + name} title={"新增 " + name + " 底下節點"}>
                    <FormGroup>
                        <FormControl type="text" bsSize="sm"
                                     autoFocus placeholder="請輸入 RDN" onChange={this.handleInputChange.bind(node)}/>
                    </FormGroup>
                    <ButtonToolbar>
                        <Button onClick={this.addOrganization.bind(node)} bsStyle="primary">新增組織</Button>
                        <Button onClick={this.addMember.bind(node)} bsStyle="success">新增人員</Button>
                    </ButtonToolbar>
                </Popover>
            );
            let label =
                <ListGroupItem bsClass="list-group-item list-group-display"
                               href="#" onClick={this.showDn.bind(node)}>
                    <span className="badge">{node.nodes.length}</span>
                    <OverlayTrigger trigger={['click']} rootClose placement="right" overlay={popoverClick}>
                        <span className="node">{type}: {name}</span>
                    </OverlayTrigger>
                </ListGroupItem>

            return (
                <TreeView key={dn} nodeLabel={label} defaultCollapsed={true}>
                    {
                        this.drawTree(node.nodes)
                    }
                </TreeView>
            );
        })
    }

    render() {
        return (
            <div>
                {
                    this.drawTree(this.state.tree)
                }
            </div>
        );
    }
}


export default TreeList;
