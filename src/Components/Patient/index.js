import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// GOOGLE CHARTS --> https://react-google-charts.com/line-chart
import {Chart} from 'react-google-charts'

//CHARTKICK  --> https://chartkick.com/react
// import { LineChart, PieChart } from 'react-chartkick';

// MATERIAL UI
import AddButton from '../Accessories/AddButton'
import AddButtonOrange from '../Accessories/AddButtonOrange'
import AddButtonGreen from '../Accessories/AddButtonGreen'

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// Components

// CSS
import './index.css';

export default class Patient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,
      patientName       : '',
      patientSurname    : '',
      bornDate          : '',
      weight            : '',
      patientsEvents    : [],
      patientsMedicines : [],
      patMedTime        : [],
      patientsReadings  : [],
      timeLineDays      : 30,
    }
  }
 
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      //  - - - - - - - SORT EVENTS / READINGS / MEDICINES FROM RECENT TO OLDER 
      // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

      let eventsCopy     = [...pat.patientsEvents];
      let medicinesCopy  = [...pat.patientsMedicines];
      let feverCopy      = [...pat.patientsFever];
      let weightsCopy    = [...pat.patientsWeights];


      let eventsSorted          = Calculations.sortByEventDate(eventsCopy);
      let medicinesSortedDate   = Calculations.sortMedicinesDate(medicinesCopy);
      let medicinesSortedAlpha  = Calculations.sortReadingsByDate(medicinesCopy);
      let feverOrdered          = Calculations.sortReadingsByDate(feverCopy);
      let weightsSorted         = Calculations.sortReadingsByDate(weightsCopy);

     // - - - - - - - Sorting end 

      this.setState({ 
        patientName       : pat.patientName,
        patientSurname    : pat.patientSurname,
        bornDate          : pat.bornDate, 
        patientsEvents    : eventsSorted,   
        patientsMedicines : medicinesSortedAlpha,      // med oredered alpahbetically for listing purposes
        patMedTime        : medicinesSortedDate,       // med chronologically ordered for graphics purposes
        patientsFever     : feverOrdered,
        patientsWeights   : weightsSorted,
      });
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _eventsGraphicData(){

    let pEvts = [...this.state.patientsEvents];
    //console.log('pEvts = ', pEvts);
    
    let today = new Date();
    let startDate = today.setDate(today.getDate() - this.state.timeLineDays);

    //let dateToConsole = Calculations.getFormatedDate(startDate);
    //console.log('Fecha de Inicio = ', dateToConsole)
    
    let eventsData = [['Fecha', 'Nro de Eventos'], []];
    let dyasBack = this.state.timeLineDays;

    for (let i = 0; i <= dyasBack; i++ ){

      let dateForArray = new Date(startDate)
      dateForArray.setDate(dateForArray.getDate() + i);
      
      //console.log('fecha a evaluar = ', startDate , ' / ', i);

      let dateFormated = Calculations.getFormatedDate(dateForArray);
      let events = 0;

      //console.log('longitud events = ', pEvts.length)
      for (let j = 0; j<pEvts.length; j++){
        
        //console.log('evts(j)', pEvts[j])
        let dateToCompare =  new Date(pEvts[j].eventDate);
        //console.log('date to compare', dateToCompare)
        let dateToCompareFormated = Calculations.getFormatedDatePlusOne(dateToCompare); // * * *  Tengo que sumar 1 al día si no me devuelde un día atrasado ? ? ? ?
        
        if (dateFormated.join('-') === dateToCompareFormated.join('-')){
          events = events + 1;
        }

        console.log('date vs dateToCompare = ', dateFormated, ' / ', dateToCompareFormated)
        console.log('events =' , events)
      }
      
      let finalDate = dateFormated.join('-');
      console.log('ArrayFormated con Join', )
      
      eventsData[i] = [finalDate, events]
    }
    console.log('el eventsData = ', eventsData);
    return eventsData

  }



  _renderPatientInfo(){
    return (
      <div className="patient-info"> 
        <div className="patient-info-block">
          <p>Nombre completo: </p><h4>{this.state.patientName} {this.state.patientSurname}</h4>
        </div>
        <div className="patient-info-block">
          <p>Fecha de nacimiento: </p><h4>{this.state.bornDate}</h4>
        </div>
      </div>
    )
  };
  _renderMedicinesInfo(){ 
    
    //console.log('render events triggered with: ', obj)
    return this.state.patientsMedicines.map((meds,j) => {
      return (
        <div className="medicines-container">
          <Link className="medicine-row" key={j} to={`/single_medicine_overview/${meds.dCode}`}> 
          
            <div id="drug-field">
               <h4>{meds.drugName}</h4>
            </div>

            {this._renderMedicineDose(meds.dailyDose)}

            <div id="ratio-field">
               <p>{meds.drugnRatio}</p>
            </div>

          </Link>
        </div>
      )
    })
  };
  _renderMedicineDose(x){
    return x.map((dose, j) => {
      return (
        <div className="dose-fields">
          <p>{dose}</p>
        </div>
      )
    })
  }
  _renderEventsInfo(){ 
    
    //console.log('render events triggered with: ', obj)
    return this.state.patientsEvents.map((evts,j) => {
      return (
        <div className="list-container">
          <Link className="standard-list-row" key={j} to={`/single_event_overview/${evts.eventId}`}> 
          
            <div className="standard-list-info-block">
               <p>{evts.eventDate}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.startTime}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.duration}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.minSaturation}</p>
            </div>
            <div className="standard-list-info-block">
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
                  <p>Peso/Fiebre</p>
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
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="Bar"
            loader={<div>Loading Chart</div>}
            data={this._eventsGraphicData()}
            options={{
              // Material design options
              chart: {
                title: 'Aurora Morales: Eventos Registrados',
                subtitle: '',
              },
            }}
            // For tests
            rootProps={{ 'data-testid': '2' }}
          />
        </div>

        <div className="medicines-area">
          
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
          </div>

          
            {this._renderMedicinesInfo()}   
         
        </div>


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
         
        </div>

      </div>

    );
  };
};

