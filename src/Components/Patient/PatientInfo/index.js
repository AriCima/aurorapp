import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import Moment from 'react-moment'; // --> https://momentjs.com/
import moment from 'moment';

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
      birthDate         : '',
      birthWeight       : '',
      firstEventDate    : '',
      // currentWeight     : '',
      // patientsEvents    : [],
    }

  }
 
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
        let name            = res.patientName;
        let surname         = res.patientSurname;
        let born            = res.birthDate;
        let bweight         = res.birthWeight;

        let eventsCopy      = [...res.patientsEvents];
        let eventsSorted    = Calculations.sortByEventDate(eventsCopy);   // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        let firstEvent      = eventsSorted[0].date;

        // let weightsCopy     = [...res.patientsWeights];
        // let weightsSorted   = Calculations.sortByEventDate(weightsCopy);
        // let wL              = weightsSorted.length;
        // let cWeight         = weightsSorted[wL-1].weight;

        this.setState({ 
            patientName       : name,
            patientSurname    : surname,
            birthDate         : born, 
            birthWeight       : bweight,
            // patientsEvents    : eventsSorted,   
            firstEventDate    : moment(firstEvent).format('DD-MMM-YYYY'),
            // currentWeight     : cWeight,
        });
    })
    .catch(function (error) {    
    console.log(error);
    })    
  }

  // componentDidUpdate(prevProps){
  //   if (this.props.cWeight !== prevProps.cWeight) {
  //       this.setState({
  //           currentWeight: this.props.cWeight}
  //       );
  //   }
  // }

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
                <h4>{this.state.birthDate}</h4>
                </div>
            </div>
            <div className="patient-info-block">
                <div className="patInfo-sbtitle">
                <p>Peso actual: </p>
                </div>
                <div className="patInfo-Info">
                <h4>{this.state.birthWeight} Kg</h4>
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

