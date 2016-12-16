import React, { Component } from 'react';
import { TreeAction } from '../actions/TreeAction.jsx';
import TreeHeaderStore from '../stores/TreeHeaderStore.jsx';
import es6BindAll from "es6bindall";
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';


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
      dn: '',
    };
  }
  
  componentDidMount() {
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
      let context = this.props.context;
      context.dn = this.state.dn;
      TreeAction.addDN(context);
      this.setState({
          dn: '',
      });
  }

  onDelete() {
    let context = this.props.context;
    context.dn = this.state.dn;
    TreeAction.deleteDN(context);
    this.setState({
      dn: '',
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.context.name}</h1>
        <div>
        <FormGroup>
          <FormControl value={this.state.dn} type="text" bsSize="sm"
            autoFocus placeholder="請輸入 DN" onChange={this.handleInputChange} />
        </FormGroup>
        <ButtonToolbar>
          <Button onClick={this.onAdd} bsStyle="primary">新增</Button>
          <Button onClick={this.onDelete}>刪除</Button>
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