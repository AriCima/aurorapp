import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// Components
import EChart from '../Cahrts/ECharts';

// CSS
import './index.css';

export default class MedWeightGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,
      patientsMedicines : [],
      weightsSorted     : [],
      timeLineDays      :10,
    }

   
  }

  componentDidMount(){
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {

      let meds            = [...res.patientsMedicines];
      let weightsCopy     = [...res.patientsWeights];
      let wSorted         = Calculations.sortByDateAsc(weightsCopy);
      let wL              = wSorted.length;

      this.setState({      
        patientsMedicines : meds,
        weightsSorted     : wSorted,
       });
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }


  _medWeightGraphicData(){

    let chartInfo = [];
    let meds      = this.state.patientsMedicines;
    let mL        = meds.length;
    let weights   = this.state.weightsSorted;
    let wL        = this.state.weightsSorted.length;
    let daysBack  = this.state.timeLineDays;

    //Cálculo de la fecha inicial
    let today = new Date();
    // let startDay = moment(today).subtract(daysBack, 'days').format('DD-MMM-YYYY');
    // let monthsBack = Number(daysBack)/30;

    let xData = [];
    let weightsData = [];
    let seriesTitle = [];   // --> [ ['name', 'unit'] ]
    let seriesData = []; //[{date, dose},  . . . . , {date, dose}], [ . . ], ];
    let dailyDose = [];

    // GENERO DATOS EJE X
    for(let d = 0; d <= daysBack; d++){     // itero días  (d)
      let dayToAdd = moment(today).subtract(daysBack-d, 'd').format('DD-MMM-YYYY');
      xData[d] = dayToAdd;
    };
    
    // ARRAYS DE MEDS NAMES Y DATES/DOSIS
    for (let s = 0; s<mL; s++){   //itero medicinas (series)
      seriesTitle[s] = [meds[s].drugName, meds[s].drugUnits];   // --> GENERO ARRAY DE [SERIES] --> [name, Units] 
      for (let d = 0; d <= daysBack; d++){  // itero días
        let rest = daysBack-d;

        let dayToAdd = moment(today).subtract(rest, 'd').format('DD-MMM-YYYY');

        let dosis = 0;
        seriesData.push([{date: dayToAdd, dose: dosis}]);   // CREO ARRAY DE FECHAS Y DOSIS [ {date: ' ', dose: ' '} , . . . , {date: ' ', dose: ' '}];
      };
      
    };

    console.log('seriesData = ', seriesData);

    // CREO ARRAY SOLO DOSIS  LAS DOSIS DE LAS MEDS EN EL ARRAY DE SERIES
    let medDosis  =[[]];

    for (let s = 0; s<mL; s++){   // itero series
      console.log('s = ', s)
      let dL = meds[s].dose.length;
      console.log('dL = ', dL)
      for (let d = 0; d <= daysBack; d++){   // itero dosis de cada med
        console.log('day = ', d)
        for (let r = 0; r < dL; r++){  // itero días 
          let doseDate = moment(meds[s].dose[r].date).format('DD-MMM-YYYY');
          console.log('dosis = ', r)
          console.log('doseDate = ', doseDate)
          console.log('seriesData', seriesData);

          if (doseDate === seriesData[d].date){
            seriesData[d].dose = meds[s].dose[r].dailyDose;  // --> array de objs con dosis nulls salvo fechas iguales al meds.dose.date
            medDosis[s][d] = meds[s].dose[r].dailyDose;      // --> array con solo dosis
          } else {
            medDosis[s][d] = null;
          }
        }

      }
    }

    for (let s = 0; s<mL; s++){             // itero series
      for (let d = 1; d < daysBack-1; d++){  // itero días 
        
        let prevDose  = medDosis[s][d-1];
        let cDose     = medDosis[s][d];
        let nextDose  = medDosis[s][d+1]
        
        if ( cDose === null && nextDose === null){
          cDose = prevDose;
        }

      }
    } 

    for (let d = 1; d < daysBack-1; d++){  // itero días 
      // ITERAMOS SOBRE CADA PESO
      for(let w = 0; w < wL; w++){
        weightsData[d] = null;
        let wDate = moment(new Date(weights[w].date)).format('DD-MMM-YYYY');
        if (xData[d] === wDate){
          weightsData[d] = Number(weights[w].weight);
        } else if (xData[d] !== wDate && w>=1) {
          weightsData[d] = Number(weights[w-1].weight);
        }
      }
    };

    seriesData.push(weightsData)

    chartInfo = [xData, seriesData]


    return chartInfo

  }
  
  render() {
    let xD = this._medWeightGraphicData()[0];
    let sD = this._medWeightGraphicData()[1];
    return (

    
      <div className="events-chart">

        {this.state.patientName === '' ? <p>LOADING !</p> : <div>

          <EChart xData={xD} sData={sD}/>
          </div>
        }

      </div>
         

    );
  };
};

