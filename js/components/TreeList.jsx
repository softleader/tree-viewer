import React, { Component } from 'react';
import TreeListStore from '../stores/TreeListStore.jsx';
import TreeView from 'react-treeview';
import { TreeAction } from '../actions/TreeAction.jsx';
import es6BindAll from "es6bindall";
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

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

  drawTree(tree) {
    return tree.map((node, i) => {
      // console.log(node);
      let type = node.type;
      let label = 
                  <ListGroupItem bsClass="list-group-item list-group-display" 
                              href="#" onClick={showDn.bind(node)}>
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

function showDn() {
  TreeAction.displayDN(this.dn);
} 

export default TreeList;
