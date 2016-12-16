import React, {Component} from 'react';
import TreeListStore from '../stores/TreeListStore.jsx';
import TreeView from 'react-treeview';
import {TreeAction} from '../actions/TreeAction.jsx';
import es6BindAll from "es6bindall";
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


function getState() {
    return {
        tree: TreeListStore.getTree()
    };
}

class TreeList extends Component {
    constructor(props) {
        super(props);
        es6BindAll(this, [
            "onChange",
            "drawTree",
        ]);
        this.state = {
            tree: [],
        };
    }

    componentDidMount() {
        TreeListStore.addChangeListener(this.onChange);
    }

    onChange() {
        this.setState(getState());
    }

    showDn() {
        TreeAction.displayDN(this.dn);
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
