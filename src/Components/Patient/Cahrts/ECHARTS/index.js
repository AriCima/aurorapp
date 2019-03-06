import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

// ECharts --> http://recharts.org/en-US/examples/SimpleLineChart
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/line';



export default class EChartLine extends React.Component {
    constructor(props){
      super(props);
  
        this.state = {
            title   : '',
            legend  : [],
            y1Name  : '',
            y1Style : {
                show: 'true',
                lineStyle: {
                    color: 'gray',
                    width: '3',
                    type: 'solid'
                }
            },
            y2Name  : '',
            y2Style : {
                show: 'true',
                lineStyle: {
                    color: 'black',
                    width: '3',
                    type: 'solid'
                },
            },
            xData  : ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
            series : [{
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
    }

  _getOption(){

    
    let option = {
        title: {
            text: this.state.title,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: this.state.legend, 
        },
        grid: {
            left: '0',
            top: '10px',
            right: '0',
            bottom: '15px',
            containLabel: true
        },
        toolbox: {
           feature: {
            saveAsImage: {}
           }
        },
        xAxis: {
            type: 'category',
            data: this.state.xData,
        },
        yAxis: [
            {
                name: this.state.y1Name,
                type: 'value',
                // max: 500
                axisLine: this.state.y1Style
                
            },
            
            
            {
                name: this.state.y2Name,
                // nameLocation: 'start',
                // max: 5,
                type: 'value',
                inverse: false
            },
            {
                axisLine: this.state.y2Style,

            }
            

        ],
        series: this.state.series,
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