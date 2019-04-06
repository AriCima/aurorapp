import React from 'react';


// ECharts --> http://recharts.org/en-US/examples/SimpleLineChart

// VER https://ecomfe.github.io/echarts-examples/public/editor.html?c=line-gradient

import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';



export default class EChartsBars extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      xData       : this.props.xData,
      seriesData  : this.props.sData,
      dataZoomOn  : this.props.dZ,
      seriesName  : this.props.sName,
      height      : this.props.h,
      width       : this.props.w,
      toolBox     : this.props.tB,
      barWidth    : this.props.bW,
      zoom        : this.props.zoom
    }
    console.log('props.xData = ', this.props.xData)
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
      dataZoom : this._getZoom(),
      grid: {
        left: '3%',
        top: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis : [
        {
          type : 'category',
          data : this.props.xData,
          axisTick: {
            alignWithLabel: false
          },
          axisLabel: {
              interval: 'auto',
              rotate: 0,
          }
        }
      ],
      yAxis :{
        position        : 'left',
        offset          : 10,
        type            : 'value',
        // name            : 'Eventos',
        // nameLocation    : 'center',
        // nameGap         : '15px',
      },
      brush: {
        toolbox:  this.state.toolBox, //['rect', 'clear'], 
        brushLink: null,
        seriesIndex: 'all',
        geoIndex: null,
        xAxisIndex: null,
        yAxisIndex: null,
        brushType: 'rect',
        brushMode: 'single',
        transformable: true,
        // brushStyle: {...},
        throttleType: 'fixRate',
        throttleDelay: 0,
        removeOnClick: true,
        // inBrush: {...},
        // outOfBrush: {...},
        z: 10000,
      },
      series  : [
        {
          name: this.state.seriesName,
          type:'bar',
          barWidth: this.state.barWidth,
          data: this.props.sData,
        }
      ]
    };

    return option
  }

  _getZoom(){
    
    let z = this.props.zoom;
   
    let zoom = [];
    
    if(z === false){
      zoom = null;
    } else {
      zoom = [{
        type: 'inside',
        disabled: this.state.dataZoomOn,
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
          height: 20,
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
            height: 5,
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
    ]
    }
    return zoom
  }

  render() {
    console.log('props.xData = ', this.props.xData)

    return (

      <div>
        {this.props.xData === [] ? <p>LOADING !</p> : 

          <ReactEcharts
            option={this._getOption()}
            style={{height: this.state.height, width: this.state.width}}
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
  