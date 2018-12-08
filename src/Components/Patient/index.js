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
      user          : this.props.userID,
      patientId     : this.props.patID,
      patientName   : '',
      patientSurname: '',
      bornDate      : '',
      weight        : '',
      patientEvents : []
    }
  }
 
  componentDidMount(){
    
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;
      //console.log("Res: ", res)
      this.setState({ 
        patientName     : pat.patientName,
        patientSurname  : pat.patientSurname,
        bornDate        : pat.bornDate, 
        patientEvents   : res.patientEvents,         
      });
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _renderPatientInfo(){
    return (
      <div className="patient-info"> 
        <div className="patient-info-block">
          <h4>{this.state.patientName}</h4>
        </div>
        <div className="patient-info-block">
          <h4>{this.state.patientSurName}</h4>
        </div>
        <div className="patient-info-block">
          <h4>{this.state.bornDate}</h4>
        </div>
      </div>
    )
  };

  _renderEventsInfo(){ 
    return this.state.patientEvents.map((evts,j) => {
      return (
        <div className="list-container">
          <Link className="apts-row" key={j} to={`/single_event_overview/${evts.id}`}> 
          
            <div className="apts-info-block">
               <p>{evts.eventDate}</p>
            </div>
            <div className="apts-info-block">
                <p>{evts.startTime}</p>
            </div>
            <div className="apts-info-block">
                <p>{evts.duration}</p>
            </div>
            <div className="apts-info-block-c">
                <p>{evts.minSaturation}</p>
            </div>
            <div className="apts-info-block-c">
                <p>{evts.fever}</p>
            </div>
          </Link>
        </div>
      )
    })
  };
  

  
  render() {

    return (

      <div className="overview">

        <div className="upper-area">

            {this.state.patientName === '' ? <p>LOADING !</p> :
              this._renderPatientInfo()
            }

            <div className="add-buttons-area">
              <div className="standard-add-button">
                <div id="button-info">
                  <p>Registrar<br/>Evento</p>
                </div>
                <div>
                  <Link to={`/new_event_register/${this.state.patientId}`}><AddButton/></Link>
                </div>
              </div>
              <div className="standard-add-button">
                <div id="button-info">
                  <p>Registrar<br/>Peso/Fiebre</p>
                </div>
                <div>
                  <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButton/></Link>
                </div>
              </div>
              <div className="standard-add-button">
              <div id="button-info">
                <p>Registrar<br/>Medicación</p>
              </div>
              <div>
                <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButton/></Link>
              </div>
            </div>
            </div>
        </div>

        <div className="lower-area">
          <div className="standard-list-header">
            <ul>
              <li>Fecha</li>
              <li>Inicio</li>
              <li>Duración</li>
              <li id="double-line">Sat. mín. <br/>%</li>
              <li id="double-line">Temperatura <br/>ºC</li>
            </ul>     
          </div>
        </div>

      </div>

    );
  };
};

