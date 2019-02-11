import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// ECHARTS
import EChart from './Cahrts/ECharts';
import EChartBars from './Cahrts/EChartsBars';


// MATERIAL UI
import AddButton from '../Accessories/AddButton'
import AddButtonOrange from '../Accessories/AddButtonOrange'
import AddButtonGreen from '../Accessories/AddButtonGreen'

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// Components
import PatientInfo from './PatientInfo';
import CurrentMed from './CurrentMed';
import EventsGraphic from './EventsGraphic';
import MedWeightGraphic from './MedWeightGraphic';
// CSS
import './index.css';

export default class Patient extends React.Component {
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

        <div className="upper-area">
          <div className="add-buttons-area">
              <div className="standard-add-button">
                <div>
                  <Link to={`/new_event_register/${this.state.patientId}`}><AddButton color="red"/></Link>
                </div>
                <div id="button-info">
                  <p>Evento</p>
                </div>
              </div>
              <div className="standard-add-button">
                <div>
                  <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButtonOrange/></Link>
                </div>
                <div id="button-info">
                  <p>Peso</p>
                </div>
              </div>
              <div className="standard-add-button">
              <div>
                <Link to={`/patient_new_medicine/${this.state.patientId}`}><AddButtonGreen/></Link>
              </div>
              <div id="button-info">
                <p>Medicación</p>
              </div>
            </div>
            </div>
        </div>
          
        <div className="middle-area">

          <div className="square-chart">

            <div className="sq-line" id="upper-line">

              <div className="chart-box" id="pat-Info">
                <div className="chartBox-Title">
                  <h2>Información del Paciente</h2>
                </div>
              
                <div className="chartBox-info">
                  {this.state.patientName === '' ? <p>LOADING !</p> :
                    <PatientInfo patID={this.state.patientId} /> //cWeight={this.state.currentWeight}/>
                  }
                </div>
              </div>

              <div className="chart-box" id="events">

                <div className="chartBox-Title">
                  <h2>Registro eventos</h2>
                </div>
                <div className="chartBox-info">

                  <div className="events-chart">
                    {this.state.patientName === '' ? <p>LOADING !</p> :
                      <EventsGraphic patID={this.props.patID} tLine={this.state.timeLineDays} events={JSON.stringify(this.state.patientsEvents)}/>
                    }
                  </div>
                </div>
              </div>

            </div>

            <div className="sq-line" id="lower-line">

              <div className="chart-box" id="current-med"> 


                <Link className="chartBox-Title" to={`/medicine_overview/${this.state.patientId}`}>
                  <h2>Medicación actual</h2>
                </Link>

                <Link className="chartBox-info" to={`/medicine_overview/${this.state.patientId}`}>
                  <CurrentMed patID={this.state.patientId} />
                </Link>
                
              </div>

              <div className="chart-box">
                <div className="chartBox-Title">
                  <h2>Registro peso</h2>
                </div>
                <div className="chartBox-info">
                  {this.state.patientName === '' ? <p>LOADING !</p> :
                    <MedWeightGraphic patID={this.props.patID} tLine={this.state.timeLineDays}/>
                  }
                </div>
              </div>

            </div>

          </div>

        </div>




        {/* <div className="lower-area">
            <div className="list-title">
              <h2>Eventos registrados</h2>
            </div>
          <div className="standard-list-header">
            <ul>
              <li id="double-line">Fecha</li>
              <li id="double-line">Hora Inicio<br/>hr:min</li>
              <li id="double-line">Duración<br/>mins</li>
              <li id="double-line">Sat. mín. <br/>%</li>
              <li id="double-line">Temperatura <br/>ºC</li>
            </ul>
          </div>
          
            {this.state.patientName === '' ? <p>LOADING !</p> :
              this._renderEventsInfo()
            }   
         
        </div> */}

      </div>

    );
  };
};

