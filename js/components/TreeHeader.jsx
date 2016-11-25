import React, { Component } from 'react';
import { TreeAction } from '../actions/TreeAction.jsx';

class TreeHeader extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.state = {
      text: '',
      editing: false,
    };
  }
  onChange(event) {
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
            onChange={this.onChange} />
          <button onClick={this.onAdd}>
            送出
          </button>
        </div>
      </div>
    );
  }
}

export default TreeHeader;