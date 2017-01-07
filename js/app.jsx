import React from 'react';
import ReactDOM from 'react-dom';
import TreeHeader from './components/TreeHeader.jsx';
import DropDown from './components/DropDown.jsx';
import TreeList from './components/TreeList.jsx';

window.react = {};

class TreeApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderFunction(component) {
        const componentArray = [];
        if(!component || component.DropDown) {
            componentArray.push(<DropDown key="1"/>);
        }
        if(!component || component.TreeList) {
            componentArray.push(<TreeList key="2"/>);
        }
        return componentArray;
    }

    render() {
        return (
            <div>
                {console.log(this.props.context)}
                <TreeHeader context={this.props.context} name={this.props.context.name}
                            component={this.props.context.component}/>
                {
                    this.renderFunction(this.props.context.component)
                }
            </div>
        )
    }
}


react.renderTree = function (contextObj) {
    ReactDOM.render(<TreeApp context={contextObj}/>, document.getElementById('showTree'));
};