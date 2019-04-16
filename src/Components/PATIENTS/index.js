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

      <div className="overview">

        <div className="middle-area">

          <div className="square-chart">

            <div className="sq-line" id="upper-line">

              <div className="chart-box" id="pat-events-info">
                
                <div className="chart-upper">
                  <Link className="chartBox-Title" to={`/events-overview/${this.state.patientId}`}>
                    <h2>Registro de Eventos</h2>
                  </Link>
                  
                  <div className="chart-add-button">
                    <div>
                        <Link to={`/new_event_register/${this.state.patientId}`}><MyButtonPlain text={'Nuevo Evento'}/></Link>
                    </div>
                  </div>
                </div>
                <div className="chartBox-info">

                <div className="events-chart">
                    {this.state.patientName === '' ? <p>LOADING !</p> :
                      <EventsGraphic patID={this.props.patID} tLine={this.state.timeLineDays}/>
                    }
                </div>
                </div>
            
              </div>
              
              <div className="chart-box" id="pat-events-statistics">
                <div className="chart-upper">
                
                  <div className="chartBox-Title">
                    <h2>Tipo de Eventos</h2>
                  </div>
                  
                  <div className="chart-add-button">
                    <div>
                        <Link to={`/new_event_register/${this.state.patientId}`}><MyButtonPlain text={'Nuevo Evento'}/></Link>
                    </div>
                  </div>
                </div>
                <div className="chartBox-info">
                  <EvStatistics patID={this.state.patientId}/>
                </div>
              </div>
            </div>

            <div className="sq-line" id="lower-line">

              <div className="chart-box" id="current-med"> 

                <div className="chart-upper">
                  <Link className="chartBox-Title" to={`/medicine_overview/${this.state.patientId}`}>
                    <h2>Medicación actual</h2>
                  </Link>
                    
                  <div className="chart-add-button">
                    <div>
                        <Link to={`/patient_new_medicine/${this.state.patientId}`}><MyButtonPlain text={'Nuevo Medicamento'}/></Link>
                    </div>
                  </div>
                </div>
               
                <div className="chartBox-info">
                  <CurrentMed patID={this.state.patientId} />
                </div>
                
              </div>


              <div className="chart-box" id="pat-weight">

                <div className="chart-upper">
                  <Link className="chartBox-Title" to={`/medicine_overview/${this.state.patientId}`}>
                    <h2>ESTADISTICAS</h2>
                  </Link>
                </div>

                </div>

            </div>



          </div>

        </div>

      </div>

    );
  };
};
