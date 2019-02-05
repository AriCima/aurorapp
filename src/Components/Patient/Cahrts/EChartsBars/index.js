import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

// ECharts --> http://recharts.org/en-US/examples/SimpleLineChart
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';



export default class EChartsBars extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        user            : this.props.userID,
        patientId       : this.props.patID,
        eventsPerMonth  : [],
        timeLineDays    : 60,
      }
    }
   
    componentDidMount(){
  
      DataService.getPatientInfo(this.state.patientId)
      .then(res => {

        let evts        = [...res.patientsEvents];
        let evtsSorted   = Calculations.sortByEventDate(evts);

       // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
        
        this.setState({ 
            eventsPerMonth :  evtsSorted
        });
        
      })
      .catch(function (error) {    
        console.log(error);
      })    
    }

  _getOption(){

    let option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow'        // ：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['01-2018', '02-2018', '03-2018', '04-2018', '05-2018', '06-2018', '07-2018'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'Eventos',
                type:'bar',
                barWidth: '60%',
                data:[10, 7, 22, 12, 34, 33, 7]
            }
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
  