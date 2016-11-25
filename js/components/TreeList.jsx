import React, { Component } from 'react';
import TreeListStore from '../stores/TreeListStore.jsx';
import TreeView from 'react-treeview';

function getAppState() {
  return {
    tree: TreeListStore.getTree()
  };
}

class TreeList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      tree: [],
    };
  }
  componentDidMount() {
    TreeListStore.addChangeListener(this.onChange);
  }
  onChange() {
    this.setState(getAppState());
  }
  render() {
    return (
      <div>
        {
          drawTree(this.state.tree)
        }
      </div>
    );
  }
}

function drawTree(tree){
    return tree.map((node, i) => {
    console.log(node);
    const type = node.type;
    const label = 
    <a href="#">
      <span className="node">{type}</span>
    </a>;
    return (
      <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={false}>
      {
        drawTree(node.nodes)
      }
      </TreeView>
    );
  })
}

export default TreeList;
