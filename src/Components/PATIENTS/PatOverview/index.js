import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// SERVICES
import DataService from '../../services/DataService';

// Components
import HeaderGral from '../../HEADERS/HeaderGral';
import EventsList from './EventsList';
import CurrentMed from './CurrentMed';
import PatSummary from './PatSummary';

// CSS
import "./index.css";
import Calculations from "../../services/Calculations";

export default class PatientOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      patID: '',
      name: '',
      surname:'',
      cWeight: null,
      patients: []
    };
  };
  

  componentDidMount(){
    DataService.getUserPatients(this.props.userID)
    .then(result => {
      console.log('patients recibidos en overview', result)
      this.setState({
        patients: result      
      })
    })
    .catch(error => {
    var errorCode = error.code;
    console.log("patients could not be loaded: ", errorCode);
  })

    DataService.getPatientInfoALT2(this.props.userID, this.props.patID)
      .then(result => {

        this.setState({
          patID: result.id,
          name: result.patData.patientName,
          surname: result.patData.patientSurname,
        })
      })
      .catch(error => {
      var errorCode = error.code;
      console.log("patient could not be loaded: ", errorCode);
    })

    
  //  DataService.getPatWeights(userID, patID)
  //  .then(result => {
  //    console.log('result del W =', result)
  //   let currentWeight = result[0].weight;

  //   this.setState({
  //     cWeight: currentWeight
  //   })
  //  })
  }

  _renderPatients(){
    let pats = this.state.patients;
    // console.log('this.state.currentWeight',this.state.currentWeight )
    return pats.map((p,j) => {
      // console.log('medicines = ',this.state.currentMedicines )
      return (
        
        <Link className="pat-block" key={j} to={`/patient-overview/${p.id}`}> 
        
          <div className="med-info-block">
            <p>{p.patientName}</p>
          </div>
        </Link>
      )
    })
  } 

  render() {

    // console.log('patInfo en el PatOverview = ', this.props.patInfo)
    const {patInfo, patID, userID } = this.props;
    const { patients, name, surname, cWeight } = this.state;
    const age = Calculations.getAge(patInfo.birthDate);
    const patL = patients.length;

    return (

    <div className="patient-overview">

      <div className="patOv-header">
        <HeaderGral patInfo={patInfo}/>
      </div>

      <div className="patOv-body">

        {patL > 1 &&  
        <div className="patients-list">

        </div>
      
        }

        <div className="pat-ov-upper">

        <div className="patOv-upper-section">
            <PatSummary cWeight={cWeight} name={name} surname={surname} age={age} userID={userID} patID={patID}/>
          </div>

          <div className="patOv-upper-section">
            <CurrentMed userID={userID} patID={patID} patInfo={patInfo}/>
          </div>

        </div>

        <div className="patOv-section">
          <EventsList patID={patID} patInfo={patInfo}/>
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
