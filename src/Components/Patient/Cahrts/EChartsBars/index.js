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

      console.log('props del bars = ', this.props.xData, ' / ', this.props.sData)

    }
   

   
  _getOption(){

    let option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            
                type : 'shadow',
            }
        },
        dataZoom: [
            {
            type: 'inside',
            disabled: false,
            xAxisIndex: null,
            yAxisIndex: null,
            radiusAxisIndex: null,
            angleAxisIndex: null,
            filterMode: 'filter',
            start: 0,
            end: 100,
            startValue: null,
            endValue: null,
            minSpan: null,
            maxSpan: null,
            minValueSpan: null,
            maxValueSpan: null,
            orient: null,
            zoomLock: false,
            throttle: 100,
            //rangeMode: [...],
            zoomOnMouseWheel: true,
            moveOnMouseMove: true,
            moveOnMouseWheel: false,
            preventDefaultMouseMove: true,
            },
            {
              type: 'slider',
              show: true,
              backgroundColor: 'rgba(47,69,84,0)',
              dataBackground: {
                lineStyle: {
                  color: '#2f4554',
                  width: 0.5,
                  type: 'solid',
                  shadowBlur: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                  },
                  //shadowColor:,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 0.3,
                },
                areaStyle: {
                  color: 'rgba(47,69,84,0.3)',
                  shadowBlur: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10
                  },
                  //shadowColor: ...,
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 0.3
                }
              },
              fillerColor: 'rgba(47,69,84,0.25)',
              borderColor: '#ddd',
              //handleIcon: ...,
              handleSize: '100%',
              handleStyle: {
                color: '#a7b7cc',
                borderColor: '#000',
                borderWidth: 0,
                borderType: 'solid',
                //shadowBlur: ...,
                //shadowColor: ...,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                //opacity: ...,
              },
              labelPrecision: 'auto',
              labelFormatter: null,
              showDetail: true,
              showDataShadow: 'auto',
              realtime: true,
              textStyle: {
                color: '#333',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 12,
                lineHeight: 12,
                //width: ...,
                //height: ...,
                textBorderColor: 'transparent',
                textBorderWidth: 0,
                textShadowColor: 'transparent',
                textShadowBlur: 0,
                textShadowOffsetX: 0,
                textShadowOffsetY: 0,
              },
              xAxisIndex: null,
              yAxisIndex: null,
              radiusAxisIndex: null,
              angleAxisIndex: null,
              filterMode: 'filter',
              start: 0,
              end: 100,
              startValue: null,
              endValue: null,
              minSpan: null,
              maxSpan: null,
              minValueSpan: null,
              maxValueSpan: null,
              orient: null,
              zoomLock: false,
              throttle: 100,
              rangeMode:  ['value', 'percent'],
              zlevel: 0,
              z: 2,
              left: 'auto',
              top: 'auto',
              right: 'auto',
              bottom: 'auto',
            }
          ],
          
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
                data : this.props.xData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis :{
                type            : 'value',
                name            : 'Eventos',
                nameLocation    : 'center',
                nameGap         : '15px',
            },
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
  