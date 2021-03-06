import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// GOOGLE CHARTS --> https://react-google-charts.com/line-chart
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
      patientsWeights   : '',
      timeLineDays      : 60,
    }
    
  }

  componentDidMount(){

    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      let medicinesCopy  = [...pat.medArray];
      let weightsCopy    = [...pat.patientsWeight];
      let weightsSorted  = Calculations.sortReadingsByDate(weightsCopy);

      console.log('weightsSorted =', weightsSorted)

      this.setState({  
        medArray          : medicinesCopy,       
        patientsWeights   : weightsSorted,  // keys are --> readingDate y readingValue
      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _medicinesGraphicData(){

    let pMeds     = [...this.state.medArray];
    let pWeight   = [...this.state.patientsWeights];
    let daysBack  = this.state.timeLineDays;
    let today     = new Date();
    let startDate = today.setDate(today.getDate() - daysBack);

    let dataFirst = [ { type: 'date', label: 'Día' }, 'Peso']
    let dataArray = []

    for (let l = 0; l < pMeds.length; l++){
      dataFirst.push(pMeds[l].drugName);
      
    };

    dataArray[0] = dataFirst
    //console.log('dataFIRST = ', dataFirst)
  
    // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
    // [new Date(2014, 0), -0.5, 5.7],
    // {drugName2: '', dose:[{date, dayDose},{date, dayDose},  . . . .]}  ];

    let graphicMeds  = [];

    // ITERACION POR FECHAS --> https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges
      for (let i = 0; i <= daysBack; i++ ){   // --> iteración desde fecha inicio hasta hoy
      //let dayDosis    = [];
      let resultante    = [];
      let date          = new Date(startDate); 
      let dateForArray  = date.setDate(date.getDate() + i); // --> date para el graphics Array
      
      let day = new Date(dateForArray).getDate().toString();
      let month = (new Date(dateForArray).getMonth()+1).toString();
      let year = new Date(dateForArray).getFullYear().toString();

      let defDate = year +','+ month +','+ day;

      let wLength = pWeight.length;
      let weight = 0;


      // ITERACION POR PESOS
      for (let w = 0; w < wLength-1; w++){

        // console.log('pWeight = ', pWeight);

        // console.log('pWeight.readingValue = ', pWeight[w].readingValue);

        let date0 = new Date(pWeight[0].readingDate) // --> comienzo de toma 
        let dateD = new Date(pWeight[w].readingDate)
        let dateD1 = new Date(pWeight[w+1].readingDate)
        let lastDate = new Date (pWeight[wLength-1].readingDate)

      
        if( date < date0){
          weight = 0;

        } else if ( date >= dateD && date < dateD1) {
          weight = pWeight[w].readingValue;
          

        } else if ( date > lastDate){
          weight = pWeight[wLength-1].readingValue; 
        
        }

        
      }

      
      // ITERACION POR MEDICAMENTOS
      for (let j=0; j < pMeds.length; j++){  // --> iteración por medicinas
        
        let medName = pMeds[j].drugName;
        let doseLength = pMeds[j].dose.length;

        //console.log('el Dose.length = ', doseLength)
        let medDose = 0;

        //console.log('Meds[j].dose[doseLength].dailyDose', pMeds[j].dose[doseLength-2].dailyDose)


        // ITERACION POR DOSIS DE MEDICAMENTO
        for(let d=0; d < doseLength; d++){ 
          let date0 = new Date(pMeds[j].dose[0].date); // --> comienzo de toma 
          let dateD = new Date (pMeds[j].dose[d].date);
          // let dateD1 = new Date (pMeds[j].dose[d+1].date);

          let dateF = new Date (pMeds[j].dose[doseLength-1].date);
          let dateAF = new Date (pMeds[j].dose[doseLength-2].date);

          if( date < date0){
            medDose = 0;

          } else if ( date > dateF){
            medDose = pMeds[j].dose[doseLength-1].dailyDose;
          
          } else {
              
            if( date >= dateD && date < pMeds[j].dose[d+1].date){
              medDose = pMeds[j].dose[d].DailyDose;

            } 
            
          }
          
        }
        resultante.unshift(medDose);
        graphicMeds.unshift(medName);
        
      }
        
      resultante.unshift(new Date(defDate), Number(weight));
      // console.log('resultante = ', resultante);
      dataArray.push(resultante);
      //console.log('dataArray = ', dataArray);
    }
    
      
    return dataArray 

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
            data={this._medicinesGraphicData()}
              // data={[
              //     [ { type: 'date', label: 'Day' }, 'Peso','Med 1'],
              //     [new Date(2014, 0), -0.5, 5.7],
              //     [new Date(2014, 1), 0.4, 8.7],
              //     [new Date(2014, 2), 0.5, 12],
              //     [new Date(2014, 3), 2.9, 15.3],
              //     [new Date(2014, 4), 6.3, 18.6],
              //     [new Date(2014, 5), 9, 20.9],
              //     [new Date(2014, 6), 10.6, 19.8],
              //     [new Date(2014, 7), 10.3, 16.6],
              //     [new Date(2014, 8), 7.4, 13.3],
              //     [new Date(2014, 9), 4.4, 9.9],
              //     [new Date(2014, 10), 1.1, 6.6],
              //     [new Date(2014, 11), -0.2, 4.5],
              // ]}
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


// arr1 = [ {date: 1, value:1}, {date: 4, value:4}, {date: 6, value: 6}];

// arr2 = [ {date:-1}, {date:0}, {date:1}, {date:2}, {date:3}, {date:4}, {date:5}, {date:6}, {date:7}, {date:8}];

// long1 = arr1.length;

// for(let j = 0; j < arr2.length; j++){
//     for(let k=0; k<arr1.length; k++){

//         if(arr2[j].date < arr1[0].date){
//             arr2[j].value = null;

//         } else  if(arr2[j].date >= arr1[long1-1].date){

//             arr2[j].value = arr1[long1-1].value;

//         } else {
            
//             if (arr2[j].date >= arr1[k].date && arr2[j].date < arr1[k+1].date) {
//                 arr2[j].value = arr1[k].value;
//             }
//         }
//     }
// }

// console.log('el resultante es = ', arr2);

