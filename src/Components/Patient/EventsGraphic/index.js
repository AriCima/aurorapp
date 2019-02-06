import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import Moment from 'react-moment'; // --> https://momentjs.com/
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// Components
import EChartBars from '../Cahrts/EChartsBars';

// CSS
import './index.css';

export default class EventsGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,

      patientsEvents    : this.props.events,
      firstEventDate    : this.props.firstEvent,

      timeLineDays      : 60,
    }
  }
 
  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;
      let eventsCopy     = [...pat.patientsEvents];
      let weightsCopy    = [...pat.patientsWeight];
      let meds           = [...pat.medArray];

      // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
      let eventsSorted  = Calculations.sortByEventDate(eventsCopy);
      let weightsSorted = Calculations.sortByEventDate(weightsCopy);

     // - - - - - - - Sorting end 

     let firstEvent = eventsSorted[0].eventDate;
     let wL         = weightsSorted.length;
     let cWeight    = weightsSorted[wL-1].readingValue;

     // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
      let medsTable = []; 
      let currentMeds = [];

      for (let k = 0; k < meds.length; k++){ // --> iteración medicinas
        let dName   = meds[k].drugName;
        let dunits  = meds[k].drugUnits;
        let index   = meds[k].dose.length;
        let dDose   = meds[k].dose[index-1].dailyDose;
        let hDose   = meds[k].dose[index-1].hourlyDose

        // medsTable recoge toda la info para mostrarla en el cuadro de registro de medicamentos
        medsTable[k] = {drugName: dName, dailyDose: dDose, hourlyDose: hDose, drugDose: dDose};

        let doseSorted = Calculations.sortMedicinesDate(meds[k].dose);
        let dL = doseSorted.length;
        let cDose = doseSorted[dL-1].dailyDose;


        if(cDose === 0){
          continue
        } else {
          currentMeds.push({medName: dName, medCDose: cDose, medUnit: dunits})
        }

      }

      this.setState({ 
        patientName       : pat.patientName,
        patientSurname    : pat.patientSurname,
        bornDate          : pat.bornDate, 

        patientsEvents    : eventsSorted,   
        firstEventDate    : firstEvent,

        currentWeight     : cWeight,

        medArray          : pat.medArray,      // med oredered alpahbetically for listing purposes
        medsTableInfo     : medsTable,
        currentMedicines  : currentMeds,

      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  componentDidUpdate(prevProps){
    if (this.props.events !== prevProps.events) {
      this.setState({
        patientEvents: this.props.events}
      );
    }
  }
  _eventsGraphicData(){

    let pEvts = [...this.state.patientsEvents];
    
    let today = new Date();
    let startDate = today.setDate(today.getDate() - this.state.timeLineDays);

    console.log('startDate = ', startDate);

    let a = moment(startDate).format('D MMM YYYY');
    let b = moment(startDate).format('MMM YYYY');
    let c = moment(startDate).add(1, 'M').format('MMM YYYY');
   
    console.log('a = ', a)
    console.log('b = ', b)
    console.log('c = ', c)
    
    let daysBack = this.state.timeLineDays;
    
 

    

    let eventsData = 12 //[{seriesName: 'Eventos', xData:[], value:[]}];

    // let daysBack = this.state.timeLineDays;

    // for (let i = 0; i <= daysBack; i++ ){

    //   let dateForArray = new Date(startDate)
    //   dateForArray.setDate(dateForArray.getDate() + i);

    //   let dateFormated = Calculations.getFormatedDate(dateForArray);
    //   let events = 0;

    //   for (let j = 0; j<pEvts.length; j++){
        
    //     let dateToCompare =  new Date(pEvts[j].eventDate);
    //     let dateToCompareFormated = Calculations.getFormatedDatePlusOne(dateToCompare); // * * *  Tengo que sumar 1 al día si no me devuelde un día atrasado ? ? ? ?
        
    //     if (dateFormated.join('-') === dateToCompareFormated.join('-')){
    //       events = events + 1;
    //     }

    //   }
      
    //   let finalDate = dateFormated.join('-');
      
    //   eventsData.push([finalDate, events])
    // }

    return eventsData

  }
  
  render() {
   
    //console.log('props med y weight', this.state.patMedTime, ' / ', this.state.patientsWeights)
    return (

    
      <div className="events-chart">

        {this.state.patientName === '' ? <p>LOADING !</p> : <div>
          {this._eventsGraphicData()}
          <EChartBars patID={this.props.patID} tLine={this.state.timeLineDays}/>
          </div>
        }

      </div>
         

    );
  };
};

