import React, { Component, createFactory } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// ECHARTS LINES  --> https://ecomfe.github.io/echarts-examples/public/editor.html?c=line-simple
import EChart from '../Cahrts/ECharts';


// CSS
import './index.css';

export default class MedWeightGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId       : this.props.patID,
      patMedicines    : [],
      medNames        : [],
      singleMeds      : [],
      weightsSorted   : [],
      timeLineDays    : 90,
    }

   
  }

  componentDidMount(){

    DataService.getPatientsMeds(this.props.patID)
    .then(res => {
      
      let meds = res;
      let mL= meds.length;
      let medNames = [];

      for( let i = 0; i < mL; i++){
        let newMed = meds[i].drugName;
        medNames.indexOf(newMed) < 0 && medNames.push(newMed);
      }

      let mNL = medNames.length;
      let singleMeds = [];

      for (let j = 0; j < mNL; j++){
        let name = medNames[j];
        let dosis = [];
        for (let k = 0; k < mL; k++){
          if (name === meds[k].drugName){
            dosis.push({date:meds[k].date, dailyDose: meds[k].dailyDose })
          }
        };
        let dosisSorted = Calculations.sortByDateAsc(dosis);
        singleMeds[j] = {drugName: name, dosis: dosisSorted};
      };

      this.setState({
        singleMeds    : singleMeds,
        patMedicines  : meds,
        medNames      : medNames
      })

      console.log('meds / single en el state: ', this.state.patMedicines, ' / ', this.state.singleMeds)
    })
    .catch(function (error) {    
      console.log(error);
    });


    DataService.getPatientsWeights(this.props.patID)
    .then(weights => {

      let wSorted = Calculations.sortByDateAsc(weights);
      let wL = wSorted.length;

      let cWeight = wSorted[wL-1].weight;

      this.setState({
        currentWeight : cWeight
      })
      console.log('weights en el state: ', this.state.weightsSorted)
    })
    .catch(function (error) {    
      console.log(error);
    }); 
    
  }

  _critiamFunction(){
    var meds = [
      {dosis: 400, date:"2019-01-01"},
      {dosis: 600, date:"2019-01-21"},
      {dosis: 300, date:"2019-02-11"},
      {dosis: 450, date:"2019-03-02"}
    ]

    var resultsDosis = [];

    var index = 90;
    var currentMedsIndex = meds.length-1;

    var currentDate = new Date();

    while (index > 0) {
        var currentDosisDate = new Date(meds[currentMedsIndex].date)
        var currentDosisQty = meds[currentMedsIndex].dosis;
    
        if(currentMedsIndex == 0){
          if(+currentDosisDate > +currentDate){
            resultsDosis.unshift({dosis: 0, date: currentDate.toLocaleString()});   
          } else {
            resultsDosis.unshift({dosis: currentDosisQty, date: currentDate.toLocaleString()});   
          }

        } else {
          if(+currentDosisDate > +currentDate){
            currentMedsIndex--;
            var currentDosisDate = new Date(meds[currentMedsIndex].date)
            var currentDosisQty = meds[currentMedsIndex].dosis;
            resultsDosis.unshift({dosis: currentDosisQty, date: currentDate.toLocaleString()});   
          } else {
            resultsDosis.unshift({dosis: currentDosisQty, date: currentDate.toLocaleString()});   
          }
        }

        currentDate.setDate(currentDate.getDate()-1);
        index--;
    }

    console.log(resultsDosis)
  }

  _medWeightGraphicData(){

    let chartInfo  = [];
    let singleMeds = this.state.singleMeds;
    let meds       = this.state.patMedicines;
    let mNL        = this.state.medNames.length;
    let weights    = this.state.weightsSorted;
    let wL         = this.state.weightsSorted.length;
    let daysBack   = this.state.timeLineDays;

    let weightsData = [];
    let seriesTitle = [];   // --> [ ['name', 'unit'] ]
    let basicData = []; //[{date, dose},  . . . . , {date, dose}], [ . . ], ];

    // GENERO DATOS EJE X
    let xData = [];
    let today = new Date();

    for(let d = 0; d <= daysBack; d++){     // itero días  (d)
      let dayToAdd = moment(today).subtract(daysBack-d, 'd').format('DD-MMM-YYYY');
      xData[d] = dayToAdd;
    };
    
    // ARRAYS DE MEDS NAMES Y DATES/DOSIS
    for (let s = 0; s<mNL; s++){   //itero medicinas (series)
      seriesTitle[s] = [meds[s].drugName, meds[s].drugUnits];   // --> GENERO ARRAY DE [SERIES] --> [name, Units] 
      let arrOfDates = [];

      for (let d = 0; d <= daysBack; d++){  // itero días
        let rest = daysBack-d;
        let dayToAdd = moment(today).subtract(rest, 'd').format('DD-MMM-YYYY');
        let dosis = 0;
        arrOfDates.push({drugName: meds[s].drugName, drugUnits: meds[s].drugUnits, date: dayToAdd, dose: dosis});
      };

      basicData.push(arrOfDates);   // CREO ARRAY DE FECHAS Y DOSIS [ {date: ' ', dose: ' '} , . . . , {date: ' ', dose: ' '}];
    };

    console.log('basicData = ', basicData)

    // REEMPLAZO DOSIS COMPARANDO FECHAS DE basicData y meds.dose.date
   
    let seriesDosis =  [];
    let bdL         = basicData.length;
    let sML         = singleMeds.length;
    

    

    // for (let s = 0; s<bdL; s++){   // itero array de info básica de cada medicina
      
    //   for (let d = 0; d <= daysBack; d++){   // itero días dentro de cada medicina
        
    //     let sMDL        = singleMeds.dosis.length
    //     for ( let r = 0; r < sMDL; r++){     // itero en el array de singleMedicines
    //       let firstDate = singleMeds[r].dosis[0].date;
    //     }
        
    //     // Fecha en el Array basicData
        
    //     let dataDate = basicData[s][d].date;

    //     let doseDate = moment(meds[s].dose[r].date).format('DD-MMM-YYYY');
    //     let defDose = meds[s].dose[r].dailyDose;

    //     if (doseDate === dataDate){
    //       basicData[s][d].dose = defDose // --> array de objs con dosis nulls salvo fechas iguales al meds.dose.date
    //     } 
          
        

    //   }

    //   // console.log('seriesDosis = ', seriesDosis);
    // }

    let singleMedDosis = [];
    let defMedDosis = [];

    // for (let s = 0; s<mL; s++){ // itero series
    //   singleMedDosis[s][0] = basicData[s][0].dose

    //   for (let d = 1; d < daysBack; d++){  // itero días 
    //     let cDose = basicData[s][d].dose;

    //     let prevDose  = basicData[s][d-1].dose;
    //     let nextDose  = basicData[s][d+1].dose;

    //     if ( cDose === 0 && nextDose === 0){
    //       let x = 0;
    //       x = prevDose;
    //       singleMedDosis[d]=x;
    //     } else{
    //       singleMedDosis[d]=cDose;
    //     }
        
        
    //       let y = basicData[s][d].dose;
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

    // basicData.push(weightsData)

    chartInfo = [xData, basicData]


    return chartInfo

  }
  
  render() {
    let xD = this._medWeightGraphicData()[0];
    let sD = this._medWeightGraphicData()[1];
    return (

    
      <div className="events-chart">

        {this.state.patMedicines === '' ? <p>LOADING !</p> : <div>

          <EChart xData={xD} sData={sD}/>
          </div>
        }

      </div>
         

    );
  };
};

  /// EXAMPLE

//   option = {
//     title: {
//        text: 'Smooth Line'
//    },
//    tooltip: {
//        trigger: 'axis'
//    },
//    legend: {
//        data:['Step Start', 'Step Middle', 'Step End']
//    },
//    grid: {
//        left: '3%',
//        right: '4%',
//        bottom: '3%',
//        containLabel: true
//    },
//    toolbox: {
//        feature: {
//            saveAsImage: {}
//        }
//    },
//    xAxis: {
//        type: 'category',
//        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//    },
//    yAxis: {
//        type: 'value'
//    },
//    series: [{
//        data: [820, 932, 901, 934, 1290, 1330, 1320],
//        type: 'line',
//        smooth: true
//    },
//    {
//        data: [920, 1932, 801, 834, 1290, 1330, 1620],
//        type: 'line',
//        smooth: true
//    }]
// };