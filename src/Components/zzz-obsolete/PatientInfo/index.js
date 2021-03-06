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
      currentWeight     : '',
      // patientsEvents    : [],
    }

  }
 
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
        let name         = res.patientName;
        let surname      = res.patientSurname;
        let born         = res.birthDate;
                      
        this.setState({ 
          patientName       : name,
          patientSurname    : surname,
          birthDate         : born, 
        });
    })
    .catch(function (error) {    
    console.log(error);
    })   

    DataService.getPatientsEvents(this.props.patID)
    .then(events =>{
      let eSorted = Calculations.sortByDateAsc(events);
      let fEvent = eSorted[0].date;

      this.setState({
        firstEventDate : moment(fEvent).format('DD-MMM-YYYY'),
      })

    })
    .catch(function (error) {    
      console.log(error);
    }); 

    DataService.getPatientsWeights(this.props.patID)
    .then(weights => {

      let wSorted = Calculations.sortByDateAsc(weights);
      // console.log('wSorted', wSorted);
      let wL = wSorted.length;

      let cWeight = wSorted[wL-1].weight;

      this.setState({
        currentWeight : cWeight
      })

    })
    .catch(function (error) {    
      console.log(error);
    }); 
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
                <h4>{this.state.birthDate}</h4>
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

