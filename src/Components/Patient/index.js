import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// MATERIAL UI
import AddButton from '../Accessories/AddButton'

// SERVICE API
import DataService from '../services/DataService';

// Components

// CSS
import './index.css';

export default class Patient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user          : this.props.userData,
      patientCode   : this.props.aptID,
      patient       : null,
    }
  }
 
  componentDidMount(){
    
    DataService.getPatientInfo(this.props.aptID)
    .then(res => {
      const apt = res;
      //console.log("Res: ", res)
      this.setState({ 
        patient : res 
      });
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _renderPatientInfo(){
    return (
      <div>
        <div className="address">
          <h4>{this.state.patient.patientName}</h4>
        </div>
        <div className="address">
          <h4>{this.state.patient.patientSurName}</h4>
        </div>
      </div>
    )
  };

  
  render() {

    return (

      <div className="apt-overview">

      {this.state.Patient === null ? <p>LOADING !</p> :
        this._renderPatientInfo()
      }

      <div className="standard-add-button">
        <div id="button-info">
          <p>Agregar Evento</p>
          <Link to={`/add_event/${this.state.patientCode}`}><AddButton/></Link>
        </div>
      </div>

      <div className="standard-add-button">
        <div id="button-info">
          <p>Agregar Medición</p>
          <Link to={`/patient_new_reading/${this.state.patientCode}`}><AddButton/></Link>
        </div>
      </div>
        

      </div>

    );
  };
};

