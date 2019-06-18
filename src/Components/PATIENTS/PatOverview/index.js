import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// SERVICES
// import DataService from '../../services/DataService';

// Components
import HeaderGral from '../../HEADERS/HeaderGral';
import EventsList from './EventsList';
import CurrentMed from "./CurrentMed";

// CSS
import "./index.css";

export default class PatientOverview extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     patID: '',
  //     patName: '',
  //     patSurname:'',
  //     patWeight: {},
  //   };
  // };
  

  // componentDidMount(){
  //   console.log('patID / userIDen el patOVerview = ', this.props.userID, ' / ', this.props.patID)
  //   DataService.getPatientInfoALT2(this.props.userID, this.props.patID)
  //     .then(result => {

  //       this.setState({
  //         patID: result.id,
  //         patName: result.patData.patientName,
  //         patSurname: result.patData.patientSurname,
  //       })
  //     })
  //     .catch(error => {
  //     var errorCode = error.code;
  //     console.log("patient could not be loaded: ", errorCode);
  //   })
  // }

  render() {

    // console.log('props en el PatOverview = ', this.props)
    const {patInfo} = this.props;

    return (

    <div className="patient-overview">

      <div className="patOv-header">
        <HeaderGral patInfo={patInfo}/>
      </div>

      <div className="patOv-body">

        <div className="patOv-section">
          <CurrentMed patInfo={patInfo}/>
        </div>

        <div className="patOv-section">
          <EventsList patInfo={patInfo}/>
        </div>
        
      </div>

      <div className="ERASED-LINES">

{/* 
      <div className="pat-ov-section">

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
        </div> 

        </div>
        
        <div className="pat-ov-medicinesSection">
          <div className="ov-section-title">
            <Link className="chartBox-Title" to={`/medicine_overview/${patID}`}>
              <h2>Resumen Medicación</h2>
            </Link>
            <div className="ev-add-button">
              <Link to={`/patient_new_medicine/${patID}`}>
                <MyButtonPlain text={"Nuevo medicamento"} />
              </Link>
            </div>
          </div>

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
      */}
      </div>
    
    </div>
      
    );
  }
}
