import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// MATERIAL UI
import MyButtonPlain from '../../Accessories/MyButtonPlain';


// Components

// CSS
import './index.css';

export default class Test extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,
      show              : true,
      display           : 'flex'
    }
  }
  

  _hide(){
    setTimeout(
        this.setState({
            show: false,
            display: 'none',
        }), 5000
    )
  }

  onHover(){
    this.setState({
        show: true,
        display: 'flex',
    })
  }
  
  render() {

    const styles = {
        display: this.state.display,
    };

    return (

      <div className="test" style={styles} onClick onHover={this.onHover}>
        <p>HELLO</p>
      </div>
    )
  }
};


var Search = React.createClass({
    getInitialState: function() {
        return { showResults: false };
    },
    onClick: function() {
        this.setState({ showResults: true });
    },
    render: function() {
        return (
            <div>
                <input type="submit" value="Search" onClick={this.onClick} />
                { this.state.showResults ? <Results /> : null }
            </div>
        );
    }
});

var Results = React.createClass({
    render: function() {
        return (
            <div id="results" className="search-results">
                Some Results
            </div>
        );
    }
});

ReactDOM.render(<Search />, document.getElementById('container'));
