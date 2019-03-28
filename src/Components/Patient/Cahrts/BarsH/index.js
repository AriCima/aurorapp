import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';

// ECharts --> http://recharts.org/en-US/examples/SimpleLineChart

// VER https://ecomfe.github.io/echarts-examples/public/editor.html?c=line-gradient

import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';



export default class BarsH extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      xData       : this.props.xData,
      seriesData  : this.props.sData,
      
    }

    console.log('props del bars = ', this.props.xData, ' / ', this.props.sData)

  }

  _getOption() {
    let option ={
      dataset: {
        source: [
            ['score', 'product'],
            [89.3, 'Ibuprofeno'],
            [57.1,  'Paracetamol'],
            [74.4,  'Canabiol'],
            [50.1,  'Aspirina'],
        ]
    },
    grid: {containLabel: true},
    xAxis: {name: 'amount'},
    yAxis: {type: 'category'},
    visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: 10,
        max: 100,
        text: ['High Score', 'Low Score'],
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#D7DA8B', '#E15457']
        }
    },
    series: [
        {
            type: 'bar',
            encode: {
                // Map the "amount" column to X axis.
                x: 'amount',
                // Map the "product" column to Y axis
                y: 'product'
            }
        }
    ]
    }
    return option
  };


  render() {

    return (

      <div>
            {this.props.xData === [] ? <p>LOADING !</p> : 

          <ReactEcharts
              option={this._getOption()}
              style={{height: '200px', width: '500px'}}
              notMerge={true}
              lazyUpdate={true}
              theme={"PRUEBA"}
              // onChartReady={this.onChartReadyCallback}
              // onEvents={EventsDict}
              // opts={} 
          />
          
          }

      </div>

    );
  };
  };
  