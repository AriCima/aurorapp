import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

// ECharts --> http://recharts.org/en-US/examples/SimpleLineChart
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';



export default class EChart extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        user              : this.props.userID,
        patientId         : this.props.patID,
        medArray          : [],
        medsTableInfo     : [],
        weights           : [],
        currentWeight     : null,
        weightDate        : '',
        timeLineDays      : 60,
      }
    }
   
    componentDidMount(){
  
      DataService.getPatientInfo(this.state.patientId)
      .then(res => {

        let meds            = [...res.medArray];
        let weightsCopy     = [...res.patientsWeight];
        let weightsSorted   = Calculations.sortReadingsByDate(weightsCopy);

       // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
        let medsTable = [];
  
        for (let k = 0; k < meds.length; k++){ // --> iteración medicinas
          let dName   = meds[k].drugName;
          let dUnits  = meds[k].drugUnits;
          let index   = meds[k].dose.length;
          let dDose   = meds[k].dose[index-1].dailyDose;
          let hDose   = meds[k].dose[index-1].hourlyDose;
  
          // medsTable recoge toda la info para mostrarla en el cuadro de registro de medicamentos
          medsTable[k] = {drugName: dName, drugUnits: dUnits, dailyDose: dDose, hourlyDose: hDose, drugDose: dDose};
        }

        let wL = weightsSorted.length;
        let lastWeight = weightsSorted[wL-1].readingValue;
        let wDate   = weightsSorted[wL-1].readingDate;
  
        this.setState({ 
            weights         : weightsSorted,
            currentWeight   : lastWeight,
            weightDate      : wDate,
            medsTableInfo   : medsTable,
        });
        
        // console.log('patientsWeights = ', this.state.weights);
        // console.log('medsTalbeInfo = ', this.state.medsTableInfo);
        // console.log('currentWeight = ', this.state.currentWeight);
        // console.log('weightDate = ', this.state.weightDate);
      })
      .catch(function (error) {    
        console.log(error);
      })    
    }

  _getOption(){

    // console.log('patientsWeights option = ', this.state.weights);
    // console.log('medsTalbeInfo option = ', this.state.medsTableInfo); 
    
    let option = {
        // title: {
        //     text: 'Medicación'
        // },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data:['Pes0', 'Med 1', 'Med 2']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: [
            {
                name: 'Dosis [mg]',
                type: 'value',
                // max: 500
                
                    axisLine: {
                        show: 'true',
                        lineStyle: {
                            color: 'yellow',
                            width: '3',
                            type: 'solid'
                        }
    
                    }
                
            },
            
            
            {
                name: 'Peso  [Kg]',
                // nameLocation: 'start',
                // max: 5,
                type: 'value',
                inverse: false
            },
            {
                axisLine: {
                    show: 'true',
                    lineStyle: {
                        color: 'red',
                        width: '3',
                        type: 'solid'
                    }

                }
            }

        ],
        series: [
            {
                name:'Peso',
                type: 'line',
                smooth: true,
                yAxisIndex: 1,  // valor "0" o "1" indica la referencia del eje Y
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'Med 1',
                type:'line',
                step: 'middle',
                data:[220, 282, 201, 234, 290, 430, 410]
            },
            {
                name:'Med 2',
                type:'line',
                step: 'end',
                data:[450, 432, 401, 454, 590, 530, 510]
            },

        ]
    };

    return option
  }

    render() {
  
      return (

        <div>

            <ReactEcharts
                option={this._getOption()}
                style={{height: '200px', width: '400px'}}
                notMerge={true}
                lazyUpdate={true}
                theme={"PRUEBA"}
                // onChartReady={this.onChartReadyCallback}
                // onEvents={EventsDict}
                // opts={} 
            />

        </div>
  
      );
    };
  };
  
  