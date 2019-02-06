import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';

export default class Patient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,
      patientName       : '',
      patientSurname    : '',
      bornDate          : '',

      patientsEvents    : [],
      firstEventDate    : '',

      currentWeight     : this.props.cWeight,
    }
  }
 
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
    let eventsCopy     = [...res.patientsEvents];
    // let weightsCopy    = [...res.patientsWeight];
    let eventsSorted  = Calculations.sortByEventDate(eventsCopy);   // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    // let weightsSorted = Calculations.sortByEventDate(weightsCopy);

    // let wL         = weightsSorted.length;
    // let cWeight    = weightsSorted[wL-1].readingValue;
    let firstEvent = eventsSorted[0].eventDate;

    this.setState({ 
        patientName       : res.patientName,
        patientSurname    : res.patientSurname,
        bornDate          : res.bornDate, 
        patientsEvents    : eventsSorted,   
        firstEventDate    : firstEvent,
        // currentWeight     : cWeight,
    });
    })
    .catch(function (error) {    
    console.log(error);
    })    
  }

  componentDidUpdate(prevProps){
    if (this.props.cWeight !== prevProps.cWeight) {
        this.setState({
            currentWeight: this.props.cWeight});
    }
  }

  render() { 
      return (
        <div className="patient-info"> 
            <div className="patient-info-block">
                <div className="patInfo-sbtitle">
                <p>Nombre: </p>
                </div>
                <div className="patInfo-Info">
                <h4>{this.state.patientName} {this.state.patientSurname}</h4>
                </div>
            </div>
            <div className="patient-info-block">
                <div className="patInfo-sbtitle">
                <p>Fecha de nacimiento: </p>
                </div>
                <div className="patInfo-Info">
                <h4>{this.state.bornDate}</h4>
                </div>
            </div>
            <div className="patient-info-block">
                <div className="patInfo-sbtitle">
                <p>Peso actual: </p>
                </div>
                <div className="patInfo-Info">
                <h4>{this.state.currentWeight} Kg</h4>
                </div>
            </div>
            <div className="patient-info-block">
            <div className="patInfo-sbtitle">
            <p>Primer evento: </p>
            </div>
            <div className="patInfo-Info">
            <h4>{this.state.firstEventDate}</h4>
            </div>
        </div>
        </div>
    );
  };
};

