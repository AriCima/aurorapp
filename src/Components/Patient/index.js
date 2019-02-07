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
// CSS
import './index.css';

export default class Patient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,

      // patientsEvents    : [],
      // firstEventDate    : '',

      // medArray          : [],
       //medsTableInfo     : [],
      // currentMedicines  : [],

      // patientsWeights   : [],
      // currentWeight     : null,

      timeLineDays      : 60,
    }
  }
  
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;
      // console.log(' el pat es = ', pat)

      let eventsCopy     = [...pat.patientsEvents];
      // let meds           = [...pat.patientMedicines];

      // console.log('pat.patientsEvents / pat.patientsWeights = ' ,pat.patientsEvents, ' / ', pat.patientsWeights )

      // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
      let eventsSorted  = Calculations.sortByEventDate(eventsCopy);

     // - - - - - - - Sorting end 

     // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
      // let medsTable = []; 
      // let currentMeds = [];

      // for (let k = 0; k < meds.length; k++){ // --> iteración medicinas
      //   let dName   = meds[k].drugName;
      //   let dunits  = meds[k].drugUnits;
      //   let index   = meds[k].dose.length;
      //   let dDose   = meds[k].dose[index-1].dailyDose;
      //   let hDose   = meds[k].dose[index-1].hourlyDose

      //   // medsTable recoge toda la info para mostrarla en el cuadro de registro de medicamentos
      //   medsTable[k] = {drugName: dName, dailyDose: dDose, hourlyDose: hDose, drugDose: dDose};

      //   let doseSorted = Calculations.sortMedicinesDate(meds[k].dose);
      //   let dL = doseSorted.length;
      //   let cDose = doseSorted[dL-1].dailyDose;

      //   if(cDose === 0){
      //     continue
      //   } else {
      //     currentMeds.push({medName: dName, medCDose: cDose, medUnit: dunits})
      //   }

      // }

      // console.log('el currentMeds = ', currentMeds)

      this.setState({ 
        // patientMedicines  : pat.patientMedicines,      // med oredered alpahbetically for listing purposes
        //medsTableInfo     : medsTable,
        // currentMedicines  : currentMeds,

      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }
  
  // _eventsGraphicData(){

  //   let pEvts = [...this.state.patientsEvents];
    
  //   let today = new Date();
  //   let startDate = today.setDate(today.getDate() - this.state.timeLineDays);
    
  //   let eventsData = [['Fecha', 'Eventos']];
  //   let dyasBack = this.state.timeLineDays;

  //   for (let i = 0; i <= dyasBack; i++ ){

  //     let dateForArray = new Date(startDate)
  //     dateForArray.setDate(dateForArray.getDate() + i);

  //     let dateFormated = Calculations.getFormatedDate(dateForArray);
  //     let events = 0;

  //     for (let j = 0; j<pEvts.length; j++){
        
  //       let dateToCompare =  new Date(pEvts[j].eventDate);
  //       let dateToCompareFormated = Calculations.getFormatedDatePlusOne(dateToCompare); // * * *  Tengo que sumar 1 al día si no me devuelde un día atrasado ? ? ? ?
        
  //       if (dateFormated.join('-') === dateToCompareFormated.join('-')){
  //         events = events + 1;
  //       }

  //     }
      
  //     let finalDate = dateFormated.join('-');
      
  //     eventsData.push([finalDate, events])
  //   }
  //   return eventsData

  // }

  // _renderMedicinesInfo(){ 
    
  //   //console.log('render events triggered with: ', obj)
  //   // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},

  //   return this.state.medsTableInfo.map((meds,j) => {
  //     return (
  //       <div className="medicines-container" key={j}>
  //         <Link className="medicine-row"  to={`/single_medicine_overview/${this.state.patientId}/${meds.drugName}`}> 
          
  //           <div id="drug-field">
  //              <h4>{meds.drugName}</h4>
  //           </div>

  //           {this._renderMedicineDose(meds.hourlyDose)}

  //           <div id="ratio-field">
  //              <p>{meds.drugRatio}</p>
  //           </div>

  //         </Link>
  //       </div>
  //     )
  //   })
  // };

  // _renderMedicineDose(x){
  //   return x.map((dose, j) => {
  //     return (
  //       <div key={j} className="dose-fields">
  //         <p>{dose}</p>
  //       </div>
  //     )
  //   })
  // };
  // _renderEventsInfo(){ 
    
  //   //console.log('render events triggered with: ', obj)
  //   return this.state.patientsEvents.map((evts,j) => {
  //     return (
  //       <div className="list-container">
  //         <Link className="standard-list-row" key={j} to={`/single_event_overview/${evts.eventId}`}> 
          
  //           <div className="standard-list-info-block">
  //              <p>{evts.eventDate}</p>
  //           </div>
  //           <div className="standard-list-info-block">
  //               <p>{evts.startTime}</p>
  //           </div>
  //           <div className="standard-list-info-block">
  //               <p>{evts.duration}</p>
  //           </div>
  //           <div className="standard-list-info-block">
  //               <p>{evts.minSaturation}</p>
  //           </div>
  //           <div className="standard-list-info-block">
  //               <p>{evts.fever}</p>
  //           </div>
  //         </Link>
  //       </div>
  //     )
  //   })
  // };
  
  render() {

    //console.log('props med y weight', this.state.patMedTime, ' / ', this.state.patientsWeights)
    return (

      <div className="overview">

        <div className="upper-area">

            {/* {this.state.patientName === '' ? <p>LOADING !</p> :
              this._renderPatientInfo()
            } */}

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

                <div className="chartBox-Title">
                  <h2>Medicación actual</h2>
                </div>

                <div className="chartBox-info">
                  <CurrentMed patID={this.state.patientId} />
                </div>
                
              </div>

              <div className="chart-box">
                <div className="chartBox-Title">
                  <h2>Registro peso</h2>
                </div>
                <div className="chartBox-info">
                  {this.state.patientName === '' ? <p>LOADING !</p> :
                    <EChart patID={this.props.patID} tLine={this.state.timeLineDays}/>
                  }
                </div>
              </div>

            </div>

          
          </div>

        </div>

        {/* <div className="medicines-area">
          
          <div className="list-title">
            <h2>Dosis díaria de medicamentos</h2>
          </div>

          <div className="drugs-list-header">
              <ul id="days-list">
                  <li id="drug-field">Droga</li>
                  <li className="single-day">0</li>
                  <li className="single-day">1</li>
                  <li className="single-day">2</li>
                  <li className="single-day">3</li>
                  <li className="single-day">4</li>
                  <li className="single-day">5</li>
                  <li className="single-day">6</li>
                  <li className="single-day">7</li>
                  <li className="single-day">8</li>
                  <li className="single-day">9</li>
                  <li className="single-day">10</li>
                  <li className="single-day">11</li>
                  <li className="single-day">12</li>
                  <li className="single-day">13</li>
                  <li className="single-day">14</li>
                  <li className="single-day">15</li>
                  <li className="single-day">16</li>
                  <li className="single-day">17</li>
                  <li className="single-day">18</li>
                  <li className="single-day">19</li>
                  <li className="single-day">20</li>
                  <li className="single-day">21</li>
                  <li className="single-day">22</li>
                  <li className="single-day">23</li>
                  <li id="ratio-field">mg/kg</li>
              </ul>
          </div> */}

          {/* {this._renderMedicinesInfo()}    */}
         
        {/* </div>


        <div className="lower-area">
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

