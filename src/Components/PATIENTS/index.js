import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// MATERIAL UI
import MyButtonPlain from '../Accessories/MyButtonPlain';


// Components
import CurrentMed from '../Patient/CurrentMed';
import EventsGraphic from '../Patient/EventsGraphic';
// import MedWeightGraphic from '../Patient/MedWeightGraphic';
import EvStatistics from '../EVENTS/EvStatistics';
// CSS
import './index.css';

export default class Patients1 extends React.Component {
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

      <div className="ov-section">



        <div className="section">
    
          <div className="ov-section-title">
            <Link className="chartBox-Title" to={`/events-overview/${this.state.patientId}`}>
              <h2>Registro de Eventos</h2>
            </Link>
            <div className="ev-add-button">
              <Link to={`/new_event_register/${this.state.patientId}`}><MyButtonPlain text={'Nuevo Evento'}/></Link>
            </div>
          </div>

          {this.state.patientName === '' ? <p>LOADING !</p> :
            <div className="events-info-box">
              <div className="sub-box">
                <EventsGraphic patID={this.props.patID} tLine={this.state.timeLineDays}/>
              </div>
              <div className="sub-box">
                <EvStatistics patID={this.state.patientId}/>
              </div>
            </div>
          }

        </div>

        <div className="section">
           
          <div className="ov-section-title">
            <Link className="chartBox-Title" to={`/medicine_overview/${this.state.patientId}`}>
              <h2>Medicación actual</h2>
            </Link>
            <div className="ev-add-button">
              <Link to={`/patient_new_medicine/${this.state.patientId}`}><MyButtonPlain text={'Nuevo Medicamento'}/></Link>
            </div>
          </div>

          {this.state.patientName === '' ? <p>LOADING !</p> :
            <div className="events-info-box">
              <div className="sub-box">
                <CurrentMed patID={this.state.patientId} />
              </div>
              <div className="sub-box">

              </div>
            </div>
          }
 
        </div>

      </div>

    );
  };
};
