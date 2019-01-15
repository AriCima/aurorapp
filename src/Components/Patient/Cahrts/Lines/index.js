import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// GOOGLE CHARTS --> https://react-google-charts.com/line-chart
//https://react-google-charts.com/line-chart
import {Chart} from 'react-google-charts'


// SERVICE API
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';
// Components

// CSS
import './index.css';

export default class LinesChart extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,
      patMedTime        : '',
      patientsReadings  : '',
      timeLineDays      : this.props.tline,
    }
    
  }

  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      //  - - - - - - - SORT EVENTS / READINGS / MEDICINES FROM RECENT TO OLDER 
      // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/

      let medicinesCopy  = [...pat.medArray];
      let weightsCopy    = [...pat.patientsWeight];

      // let medicinesSortedDate   = Calculations.sortMedicinesDate(medicinesCopy);
      let weightsSorted         = Calculations.sortReadingsByDate(weightsCopy);

     // console.log('medicinesDate = ', medicinesSortedDate);
     // console.log('weightsSorted = ', weightsSorted);

     // - - - - - - - Sorting end 

      this.setState({  
        patMedicines      : medicinesCopy,       
        patientsWeights   : weightsSorted,
      });

      console.log('state.medicinesDate = ', this.state.patMedTime);
      console.log('state.weights-Sorted = ', this.state.patientsWeights);

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _medicinesGraphicData(){

    let pMeds = [...this.state.patMedicines];
    let weights = [...this.state.patientsWeights];

    

    let today = new Date();
    let startDate = today.setDate(today.getDate() - this.state.timeLineDays);

    //let dateToConsole = Calculations.getFormatedDate(startDate);
    //console.log('Fecha de Inicio = ', dateToConsole)
    
 //   let medsData = [{ type: 'date', label: 'Fechas' },'Peso', med1];

    let dyasBack = this.state.timeLineDays;

    // let medicinesForGraphic = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
    // {drugName2: '', dose:[{date, dayDose},{date, dayDose},  . . . .]}  ];

    

    for (let i = 0; i <= dyasBack; i++ ){



      let dateForArray = new Date(startDate)
      dateForArray.setDate(dateForArray.getDate() + i);

      let dateFormated = Calculations.getFormatedDate(dateForArray);
      let dose = 0;

      
      //console.log('longitud events = ', pEvts.length)
      for (let j = 0; j<pMeds.length; j++){

        let dateToCompare =  new Date(weights[j].eventDate);
        let dateToCompareFormated = Calculations.getFormatedDatePlusOne(dateToCompare); // * * *  Tengo que sumar 1 al día si no me devuelde un día atrasado ? ? ? ?
        
        if (dateFormated.join('-') === dateToCompareFormated.join('-')){
          dose = pMeds[j].totalDailyDose;
        } else {
          dose = pMeds[j-1].totalDailyDose;
        }
       
      }
      

    }
    console.log('el  = ', );
    return 

  }


  _renderEventsInfo(){ 
    
    //console.log('render events triggered with: ', obj)
    return this.state.LinesChartsEvents.map((evts,j) => {
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
        </div>
          
        <div className="middle-area">
          
        <Chart
            width={'100%'}
            height={'500'}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={[
                [
                { type: 'date', label: 'Day' },
                'Peso',
                'Med 1',
                ],
                [new Date(2014, 0), -0.5, 5.7],
                [new Date(2014, 1), 0.4, 8.7],
                [new Date(2014, 2), 0.5, 12],
                [new Date(2014, 3), 2.9, 15.3],
                [new Date(2014, 4), 6.3, 18.6],
                [new Date(2014, 5), 9, 20.9],
                [new Date(2014, 6), 10.6, 19.8],
                [new Date(2014, 7), 10.3, 16.6],
                [new Date(2014, 8), 7.4, 13.3],
                [new Date(2014, 9), 4.4, 9.9],
                [new Date(2014, 10), 1.1, 6.6],
                [new Date(2014, 11), -0.2, 4.5],
            ]}
            options={{
                chart: {
                title:
                    'Peso vs Dosis medicamentos',
                },
                width: 900,
                height: 500,
                series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: { axis: 'Weight' },
                1: { axis: 'DrugDose' },
                },
                axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                    Weight: { label: 'Pesot [Kg]' },
                    DrugDose: { label: 'Dosis diaria [mg] o [ml]' },
                },
                },
            }}
            rootProps={{ 'data-testid': '4' }}
        />
        </div>


      </div>

    );
  };
};


