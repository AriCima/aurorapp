import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// MATERIAL UI
import MyButtonPlain from "../../Accessories/MyButtonPlain";

// Components
import EventsList from './PatEvents/EventsList';
import CurrentMed from "./CurrentMed";
import EventsGraphic from "../../Patient/EventsGraphic";
// import MedWeightGraphic from '../Patient/MedWeightGraphic';
import EvStatistics from "../../EVENTS/EvStatistics";
// CSS
import "./index.css";

export default class PatientOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.userID,
      patientId: this.props.patID,
      timeLineDays: 60
    };
  }

  render() {

    const {patID} = this.props;

    return (
      <div className="pat-ov-section">

        <div className="pat-ov-patInfoSection">

          <div className="pat-info-block">
            <div className="patInfo-var">
              <p>Nombre: </p>
            </div>
            <div className="patInfo-value">
              <h4>
                {this.state.patientName} {this.state.patientSurname}
              </h4>
            </div>
          </div>
          <div className="pat-info-block">
            <div className="patInfo-var">
              <p>Edad: </p>
            </div>
            <div className="patInfo-value">
              <h4>{this.state.birthDate}</h4>
            </div>
          </div>
          <div className="pat-info-block">
            <div className="patInfo-var">
              <p>Peso actual: </p>
            </div>
            <div className="patInfo-value">
              <h4>{this.state.currentWeight} Kg</h4>
            </div>
          </div>
         
        </div>

        <div className="pat-ov-eventsSection">

          <EventsList />


          {/* <div className="ov-section-title">
            <Link
              className="chartBox-Title"
              to={`/events-overview/${this.state.patientId}`}
            >
              <h2>Resumen Eventos</h2>
            </Link>
            <div className="ev-add-button">
              <Link to={`/new_event_register/${this.state.patientId}`}>
                <MyButtonPlain text={"Nuevo Evento"} />
              </Link>
            </div>
          </div>

          {this.state.patientName === "" ? (
            <p>LOADING !</p>
          ) : (
            <div className="events-info-box">
              <div className="sub-box">
                <EventsGraphic patID={patID} tLine={this.state.timeLineDays} />
              </div>
              <div className="sub-box">
                <EvStatistics patID={patID} />
              </div>
            </div>
          )}
        </div> */}

        </div>
        
        <div className="pat-ov-medicinesSection">
          {/* <div className="ov-section-title">
            <Link className="chartBox-Title" to={`/medicine_overview/${patID}`}>
              <h2>Resumen Medicación</h2>
            </Link>
            <div className="ev-add-button">
              <Link to={`/patient_new_medicine/${patID}`}>
                <MyButtonPlain text={"Nuevo medicamento"} />
              </Link>
            </div>
          </div> */}

           {this.state.patientName === "" ? (
            <p>LOADING !</p>
          ) : (
            <div className="events-info-box">
              <div className="sub-box">
                <CurrentMed patID={patID} />
              </div>
              <div className="sub-box" />
            </div>
          )} 
        </div>

      </div>
      
    );
  }
}
