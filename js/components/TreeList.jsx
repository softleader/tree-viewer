import React, {Component} from 'react';
import TreeLoaderStore from '../stores/TreeLoaderStore.jsx';
import TreeView from 'react-treeview';
import {TreeAction} from '../actions/TreeAction.jsx';
import es6BindAll from "es6bindall";
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


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
            tree: TreeLoaderStore.getTree()
        };
    }

    drawTree(tree) {
        return tree.map((node, i) => {
            // console.log(node);
            let type = node.type;
            // this.showDn = this.showDn.bind(node);
            let label =
                <ListGroupItem bsClass="list-group-item list-group-display"
                               href="#" onClick={this.showDn.bind(node)}>
                    <span className="node">{type}</span>
                    <span className="badge">{node.nodes.length}</span>
                </ListGroupItem>

            return (
                <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={true}>
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
