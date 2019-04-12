import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// MATERIAL UI
import MyButtonPlain from '../../Accessories/MyButtonPlain';


// Components
import PInfo from './PInfo';
import CurrentMed from './CurrentMed'

// CSS
import './index.css';

export default class POverview extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,
      timeLineDays      : 60,
    }
  }
  

  
  render() {

    return (

      <div className="pat-summary">
        <PInfo patID={this.state.patientId}/>

        <CurrentMed patID={this.state.patientId}/>

      </div>
    )
  }
};

