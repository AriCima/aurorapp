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
        xData       : this.props.xData,
        seriesData  : this.props.sData,
        
      }
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
            left: '0',
            top: '3%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : this.state.xData,
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
        series  : [
            {
                name:'Eventos',
                type:'bar',
                barWidth: '60%',
                data: this.props.sData,
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
  