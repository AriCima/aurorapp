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
      medArray          : '',
      patientsReadings  : '',
      timeLineDays      : 30,
    }
    
  }

  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      let medicinesCopy  = [...pat.medArray];
      let weightsCopy    = [...pat.patientsWeight];

      // let medicinesSortedDate   = Calculations.sortMedicinesDate(medicinesCopy);
      let weightsSorted         = Calculations.sortReadingsByDate(weightsCopy);

     // console.log('medicinesDate = ', medicinesSortedDate);
     // console.log('weightsSorted = ', weightsSorted);

     // - - - - - - - Sorting end 

      this.setState({  
        medArray          : medicinesCopy,       
        patientsWeights   : weightsSorted,
      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _medicinesGraphicData(){

    let pMeds     = [...this.state.medArray];
    let daysBack  = this.state.timeLineDays;
    let today     = new Date();
    let startDate = today.setDate(today.getDate() - daysBack);


    // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
    // [new Date(2014, 0), -0.5, 5.7],
    // {drugName2: '', dose:[{date, dayDose},{date, dayDose},  . . . .]}  ];


    let graphicArray = [];
    let graphicMeds  = [];
    
    // Iteración entre fechas --> https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges


    for (let i = 0; i <= daysBack; i++ ){   // --> iteración desde fecha inicio hasta hoy
      let dayDosis = [];
      let date = new Date(startDate); 
      let dateForArray = date.setDate(date.getDate() + i); // --> date para el graphics Array
      
      // console.log('pMeds.length = ', pMeds.length)
      for (let j=0; j < pMeds.length; j++){  // --> iteración por medicinas
        
        let medName = pMeds[j].drugName;
        let doseLength = pMeds[j].dose.length;
       
        // console.log('doseLength = ', doseLength)
        for(let d=0; d < doseLength; d++){  // --> iteración por dosis de una misma medicina
          
          if( date < pMeds[j].dose[0].date){
            let medDose = 0;
            dayDosis[j] = medDose;

          } else if ( date >= pMeds[j].dose[d].date && date < pMeds[j].dose[d+1].date) {
            let medDose = pMeds[j].dose[d].dayDose;
            dayDosis[j] = medDose;

          } else if ( date > pMeds[j].dose[doseLength-1].date){
            let  medDose = pMeds[j].dose[doseLength].dayDose
            dayDosis[j] = medDose;
          }
          
        }

        graphicMeds.push(medName);

      }

      graphicArray.push([new Date(dateForArray), dayDosis])

    }

    console.log('El graphicsArray es = ', graphicArray)

    return (
      <div>
        {this.graphicArray}
      </div>
    )

  };


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


