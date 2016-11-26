import React, { Component } from 'react';
import { TreeAction } from '../actions/TreeAction.jsx';
import TreeHeaderStore from '../stores/TreeHeaderStore.jsx';
import es6BindAll from "es6bindall";

class TreeHeader extends Component {
  constructor(props) {
    super(props);
    es6BindAll(this, [
      "onChange", 
      "handleInputChange", 
      "onAdd",
      "onDelete"
    ]);
    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    TreeHeaderStore.addChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      text: TreeHeaderStore.getDn(),
    });
  }
  
  handleInputChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  onAdd() {
    TreeAction.addDN(this.state.text);
    this.setState({
      text: '',
    });
  }

  onDelete() {
    TreeAction.deleteDN(this.state.text);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <div>
        <h1>Tree</h1>
        <div>
          <input
            value={this.state.text}
            type="text"
            autoFocus
            placeholder="請輸入 DN"
            onChange={this.handleInputChange} />
          <button onClick={this.onAdd}>新增</button>
          <button onClick={this.onDelete}>刪除</button>
        </div>
      </div>
    );
  }
}

export default TreeHeader;