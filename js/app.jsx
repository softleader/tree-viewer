import React from 'react';
import ReactDOM from 'react-dom';
import TreeHeader from './components/TreeHeader.jsx';
import TreeList from './components/TreeList.jsx';

class App extends React.Component {
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

ReactDOM.render(<App />, document.getElementById('app'));