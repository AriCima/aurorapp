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

    // GENERO DATOS EJE X
    for(let d = 0; d <= daysBack; d++){     // itero días  (d)
      let dayToAdd = moment(today).subtract(daysBack-d, 'd').format('DD-MMM-YYYY');
      xData[d] = dayToAdd;
    };
    
    // ARRAYS DE MEDS NAMES Y DATES/DOSIS
    for (let s = 0; s<mL; s++){   //itero medicinas (series)
      seriesTitle[s] = [meds[s].drugName, meds[s].drugUnits];   // --> GENERO ARRAY DE [SERIES] --> [name, Units] 
      let arrOfDates = [];
      for (let d = 0; d <= daysBack; d++){  // itero días
        let rest = daysBack-d;
        let dayToAdd = moment(today).subtract(rest, 'd').format('DD-MMM-YYYY');
        let dosis = 0;
        arrOfDates.push({date: dayToAdd, dose: dosis});
      };
      seriesData.push(arrOfDates);   // CREO ARRAY DE FECHAS Y DOSIS [ {date: ' ', dose: ' '} , . . . , {date: ' ', dose: ' '}];
    };

    // console.log('seriesData = ', seriesData)

    // REEMPLAZO DOSIS COMPARANDO FECHAS DE seriesData y meds.dose.date
   
    let seriesDosis =  [];
    let sdL         = seriesData.length;

    for (let s = 0; s<sdL; s++){   // itero series
      let dL = meds[s].dose.length;
      
      for (let d = 0; d <= daysBack; d++){   // itero días  
       
        // Fecha en el Array seriesData
        
        let dataDate = seriesData[s][d].date;

        for (let r = 0; r < dL; r++){        // itero dosis de cada med
          let doseDate = moment(meds[s].dose[r].date).format('DD-MMM-YYYY');
          let defDose = meds[s].dose[r].dailyDose;

          if (doseDate === dataDate){
            seriesData[s][d].dose = defDose // --> array de objs con dosis nulls salvo fechas iguales al meds.dose.date
          } 
          
        }

      }

      // console.log('seriesDosis = ', seriesDosis);
    }

    let singleMedDosis = [];
    let defMedDosis = [];

    // for (let s = 0; s<mL; s++){ // itero series
    //   singleMedDosis[s][0] = seriesData[s][0].dose

    //   for (let d = 1; d < daysBack; d++){  // itero días 
    //     let cDose = seriesData[s][d].dose;

    //     let prevDose  = seriesData[s][d-1].dose;
    //     let nextDose  = seriesData[s][d+1].dose;

    //     if ( cDose === 0 && nextDose === 0){
    //       let x = 0;
    //       x = prevDose;
    //       singleMedDosis[d]=x;
    //     } else{
    //       singleMedDosis[d]=cDose;
    //     }
        
        
    //       let y = seriesData[s][d].dose;
    //       singleMedDosis[d] = y
    //     }

    //     defMedDosis[s] = singleMedDosis;

    //   }
      
    // } 




    // PESOS
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

    // seriesData.push(weightsData)

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

