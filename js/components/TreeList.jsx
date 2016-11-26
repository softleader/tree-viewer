import React, { Component } from 'react';
import TreeListStore from '../stores/TreeListStore.jsx';
import TreeView from 'react-treeview';
import { TreeAction } from '../actions/TreeAction.jsx';
import es6BindAll from "es6bindall";

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
      const type = node.type;
      const label = <a href="#" onClick={showDn.bind(node)}>
                      <span className="node">{type}</span>
                    </a>;
      return (
        <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
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
