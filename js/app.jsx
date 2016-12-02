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
        <TreeHeader />
        <TreeList />
      </div>
    );
  }
}

react.renderTree = function(){
  ReactDOM.render(<TreeApp />, document.getElementById('showTree')); 
};