import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// MATERIAL UI
import MyButtonPlain from '../Accessories/MyButtonPlain';


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

        <div className="middle-area">

          <div className="square-chart">

            <div className="sq-line" id="upper-line">

              <Link to={`/single-patient-overview/${this.state.patientId}`} className="chart-box" id="pat-Info">
                
                <div className="chart-upper">
                  <div className="chartBox-Title">
                    <h2>Información del Paciente</h2>
                  </div>
                  
                  <div className="chart-add-button">
                    <div>
                        <Link to={`/single-patient-overview/${this.state.patientId}`}><MyButtonPlain text={'EDITAR'}/></Link>
                    </div>
                  </div>
                </div>
              
                <div className="chartBox-info">
                  {this.state.patientName === '' ? <p>LOADING !</p> :
                    <PatientInfo patID={this.state.patientId} /> //cWeight={this.state.currentWeight}/>
                  }
                </div>
              </Link>

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
                    <h2>Dosis por Kg <span>(últimos 30 días)</span></h2>
                  </Link>
                    
                  <div className="chart-add-button">
                    <div>
                        <Link to={`/patient_new_weight/${this.state.patientId}`}><MyButtonPlain text={'Registrar Peso'}/></Link>
                    </div>
                  </div>
                </div>

                <div className="chartBox-info">
                  {this.state.patientName === '' ? <p>LOADING !</p> :
                    <MedWeightGraphic 
                      patID={this.props.patID} 
                      tLine={'30'} 
                      w={'400px'} 
                      h={'200px'}
                      yName={''}
                      nameGap={'0px'}
                      left = {'0'}
                      top = {'40px'}
                      right= {'0px'}
                      bottom= {'0px'}
                    />
                  }
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    );
  };
};

{/* 
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
           */}
