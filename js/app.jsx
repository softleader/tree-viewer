import React from 'react';
import ReactDOM from 'react-dom';
import TreeHeader from './components/TreeHeader.jsx';
import TreeList from './components/TreeList.jsx';

window.react = {};

class TreeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {console.log(this.props.context)}
        <TreeHeader context = {this.props.context} />
        <TreeList />
      </div>
    );
  }
}

react.renderTree = function(contextObj){
  ReactDOM.render(<TreeApp context = {contextObj} />, document.getElementById('showTree')); 
};