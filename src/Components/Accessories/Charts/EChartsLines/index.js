import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/line';


export default class EChartsLines extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      xData       : this.props.xD,
      seriesData  : this.props.sD,
      height      : this.props.h,
      width       : this.props.w,
      yName       : this.props.yName,
      nameGap     : this.props.nameGap,
      smooth      : this.props.smooth,
      xPointer    : this.props.xPointer,
      left        : this.props.left,
      top         : this.props.top,
      right       : this.props.right,
      bottom      : this.props.bottom,
    }
    console.log('props x / s = ', this.props.xD, ' / ', this.props.sD)
  }

  componentDidUpdate(prevProps, prevState){
    console.log('DID UPDATE LAUNCHED')
    if(this.props.sD !== prevProps.sD ){
      this.setState({
        xData       : this.props.xD,  
        seriesData  : this.props.sD,   
        height      : this.props.h,
        width       : this.props.w,
        yName       : this.props.yName,
        nameGap     : this.props.nameGap,
        smooth      : this.props.smooth,
        left        : this.props.left,
        top         : this.props.top,
        right       : this.props.right,
        bottom      : this.props.bottom,
        xPointer    : this.props.xPointer,

      })
    }
  }

  //  OPTIONS STRUCTURE
  //   option = {
  //     xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //     },
  //     yAxis: {
  //         type: 'value'
  //     },
  //     series: [{
  //         data: [820, 932, 901, 934, 1290, 1330, 1320],
  //         type: 'line',
  //         smooth: true
  //     }]
  // };


  _getOption(){
    console.log('Props Data Date', this.props.sD, ' / ', this.props.xD)
    console.log('State Data Date', this.state.seriesData, ' / ', this.state.xData)

    // console.log('sData y xData', this.state.seriesData, ' / ', this.state.xData)
  
    let option = {
      tooltip : {
        trigger: 'axis',
        snap: false,
        label: {
          show: 'true',
        },
        axisPointer : {            
          type : this.state.xPointer       // ：'line' | 'shadow'
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
        type          :'category',
        data          : this.state.xData,
        axisTick: {
          alignWithLabel: true
        }
      },

      yAxis: {
        type          : 'value',
        name          : this.props.yName,
        nameLocation  : 'end',
        nameGap       : this.props.nameGap,
        
        nameTextStyle : {
          color: 'gray',
          fontStyle: 'normal',
          fontWeight: 'bold',
        },
      },
      series: [{
        data: this.state.seriesData,
        type: 'line',
        smooth: this.state.smooth,
      }]

      
    }
    
    return option

  }

  render() {
    return (

      <div>    
        
        <ReactEcharts
          option={this._getOption()}
          style={{height: this.props.h, width: this.props.w}}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </div>


    )
  }
}