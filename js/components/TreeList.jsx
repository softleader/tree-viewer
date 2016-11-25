import React, { Component } from 'react';
import TreeListStore from '../stores/TreeListStore.jsx';
import TreeView from 'treeview-react-bootstrap';

function getAppState() {
  return {
    tree: TreeListStore.getTree(),
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
          <TreeView data={this.state.tree} />
        }
      </div>
    );
  }
}

export default TreeList;
