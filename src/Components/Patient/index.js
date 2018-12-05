import React, { Component } from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

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
      user          : this.props.userID,
      patientId     : this.props.patID,
      patientName   : '',
      patientSurname: '',
      bornDate      : '',
      weight        : '',
    }
  }
 
  componentDidMount(){
    
    DataService.getPatientInfo(this.state.patient)
    .then(res => {
      const pat = res;
      //console.log("Res: ", res)
      this.setState({ 
        patientName     : pat.patientName,
        patientSurname  : pat.patientSurname,
        bornDate        : pat.bornDate,          
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
          <h4>{this.state.patientName}</h4>
        </div>
        <div className="address">
          <h4>{this.state.patientSurName}</h4>
        </div>
        <div className="address">
          <h4>{this.state.bornDate}</h4>
        </div>
      </div>
    )
  };

  
  render() {

    return (

      <div className="apt-overview">

      {this.state.patientName === '' ? <p>LOADING !</p> :
        this._renderPatientInfo()
      }

      <div className="standard-add-button">
        <div id="button-info">
          <p>Agregar Evento</p>
          <Link to={`/patient_new_event/${this.state.patientId}`}><AddButton/></Link>
        </div>
      </div>

      <div className="standard-add-button">
        <div id="button-info">
          <p>Agregar Medición</p>
          <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButton/></Link>
        </div>
      </div>
        

      </div>

    );
  };
};

