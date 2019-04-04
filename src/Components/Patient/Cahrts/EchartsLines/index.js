import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/line';


export default class EChartsLines extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      xData       : this.props.xData,
      seriesData  : this.props.sData,
      height      : this.props.h,
      width       : this.props.w,
      yName       : this.props.yName,
      nameGap     : this.props.nameGap,
      left        : this.props.left,
      top         : this.props.top,
      right       : this.props.right,
      bottom      : this.props.bottom,
    }
  }



  getOption(){
  
    let option = {

      // title: {
      //   text: 'Evolución de la medicina'
      // },

      // legend: {
      //   data: ['ari1','ari5','ari4','ari3','ari2' ],
      //   zlevel: 5,
      // },
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
      tooltip : {
        trigger: 'axis',
        label: {
          show: 'false',
        },
        axisPointer : {            
          type : 'shadow'        // ：'line' | 'shadow'
        }
      },
      grid: {
        left          : this.state.left,
        top           : this.state.top,
        right         : this.state.right,
        bottom        : this.state.bottom,
        containLabel: true
      },

      xAxis: {
        type: 'category',
        data          : this.props.xData,
        axisTick: {
          alignWithLabel: true
        }
      },

      yAxis: {
        type: 'value',
        name          : this.props.yName,
        nameLocation: 'center',
        nameGap       : this.props.nameGap,
      },

      series: this.props.sData,
      color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],

    };

    return option

  }

  render() {

    return (

      <div>   
        {(this.state.xD === '')}     
        <ReactEcharts
        option={this.getOption()}
        style={{height: this.props.h, width: this.props.w}}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}

        />
      </div>


    )
  }
}