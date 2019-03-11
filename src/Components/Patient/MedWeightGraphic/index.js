import React, { Component, createFactory } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// ECHARTS LINES  --> https://ecomfe.github.io/echarts-examples/public/editor.html?c=line-simple
import EChartsLines from '../Cahrts/EChartsLines';


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
      xD              : [],
      sD              : [],
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
      }); 

      this._dataGenerator();
      this._xAxisData(this.state.timeLineDays);
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
      // console.log('weights en el state: ', this.state.weightsSorted)
    })
    .catch(function (error) {    
      console.log(error);
    }); 


  };

  _dataGenerator(){
    // console.log('_dataGenerator LAUNCHED')
    let meds    = this.state.singleMeds;
    let index   = meds.length;
    let yValues = [];
    let series  = [];
    let type    = 'line';
    let smooth  = false;

 
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

    for (let j = 0; j < index; j++){
      
      yValues[j] = this._cristiamFn(meds[j].dosis);
      
      // console.log('yValues[j]', yValues[j])
      
      let dayDosis = [...yValues[j]];

      series[j]={
        data    : dayDosis,
        type    : type,
        smooth  : smooth,
      };

      // console.log('series', series)

    }
    console.log('series source', series)

    this.setState({
      sD : series
    })
    
  
  
  };
 
  _cristiamFn(meds){
    // input meds = [
    //   {dosis: 400, date:"2019-01-01"},
    //   {dosis: 600, date:"2019-01-21"},
    //   {dosis: 300, date:"2019-02-11"},
    //   {dosis: 450, date:"2019-03-02"}
    // ]

    let resultsDosis = [];
    let resultDates = [];
    let index = 90;
    let medsIndex = meds.length-1;

    let currentDate = new Date();

    while (index > 0) {
      let medDate = new Date(meds[medsIndex].date)
      let medQty = meds[medsIndex].dailyDose;
    
      if(medsIndex == 0){
        if(+medDate > +currentDate){
          resultsDosis.unshift(0);
          resultDates.unshift(currentDate.toLocaleString())
        } else {
          resultsDosis.unshift(medQty);
          resultDates.unshift(currentDate.toLocaleString())
        }

      } else {
        if(+medDate >= +currentDate){
          medsIndex--;
          let medDate = new Date(meds[medsIndex].date)
          let medQty = meds[medsIndex].dailyDose;
          resultsDosis.unshift(medQty);   
          resultDates.unshift(currentDate.toLocaleString())
        } else {
          resultsDosis.unshift(medQty);  
          resultDates.unshift(currentDate.toLocaleString())
        }
      }

      currentDate.setDate(currentDate.getDate()-1);
      index--;
    }

    return (resultsDosis)
  };
  
  _xAxisData(index){
    console.log('xAXIS LAUNCHED');
    let resultDates = []; 
    let currentDate = new Date();

    while (index > 0) {
      
      let formatedDate = moment(currentDate).format('DD-MMM-YYYY');
      resultDates.unshift(formatedDate);
      currentDate.setDate(currentDate.getDate()-1);
      index--;
    }

    this.setState({
      xD : resultDates
    })
    
    // console.log('xD = ', this.state.xD)
  };
  
  
  render() {
    return (
      <div className="med-weight-chart">
        {this.state.sD === [] ? <p>LOADING !</p> : 
          <div> 
            <EChartsLines xData={this.state.xD} sData={this.state.sD}/>
          </div>
        }
      </div>
    );
  };
};



/// EXAMPLE


  // _cristiamFnORIGINAL(meds){
  //   // input meds = [
  //   //   {dosis: 400, date:"2019-01-01"},
  //   //   {dosis: 600, date:"2019-01-21"},
  //   //   {dosis: 300, date:"2019-02-11"},
  //   //   {dosis: 450, date:"2019-03-02"}
  //   // ]

  //   console.log('meds en cristiam', meds)
  //   var resultsDosis = [];
  //   var index = 90;
  //   var medsIndex = meds.length-1;

  //   var currentDate = new Date();

  //   while (index > 0) {
  //     var medDate = new Date(meds[medsIndex].date)
  //     var medQty = meds[medsIndex].dailyDose;
    
  //     if(medsIndex == 0){
  //       if(+medDate > +currentDate){
  //         resultsDosis.unshift({dosis: 0, date: currentDate.toLocaleString()});
  //       } else {
  //         resultsDosis.unshift({dosis: medQty, date: currentDate.toLocaleString()});
  //       }

  //     } else {
  //       if(+medDate >= +currentDate){
  //         medsIndex--;
  //         var medDate = new Date(meds[medsIndex].date)
  //         var medQty = meds[medsIndex].dailyDose;

  //         resultsDosis.unshift({dosis: medQty, date: currentDate.toLocaleString()});   
  //       } else {
  //         resultsDosis.unshift({dosis: medQty, date: currentDate.toLocaleString()});   
  //       }
  //     }

  //     currentDate.setDate(currentDate.getDate()-1);
  //     index--;
  //   }

  //   console.log('resultDosis de Cris =', resultsDosis)
  //   return resultsDosis
  // };


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