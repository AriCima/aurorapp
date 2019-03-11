import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/line';


export default class EChartsLines extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      xData       : this.props.xData,
      seriesData  : this.props.sData,
      
    }
  }


  getOption(){
  
    let dd = this.state.xData;
    console.log('dd = ', dd)

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

      xAxis: {
        type: 'category',
        data: this.props.xData,
        axisTick: {
          alignWithLabel: true
      }
      },
      yAxis: {
        type: 'value'
      },

      series: this.props.sData,
       color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      // [{
      //     data: [820, 932, 901, 934, 1290],
      //     type: 'line',
      //     smooth: true
      // }]
    };

    return option

  }

  render() {

    console.log('xData / series = ', this.props.xData, ' / ', this.props.sData);

    return (

      <div>   
        {(this.state.xD === '')}     
        <ReactEcharts
        option={this.getOption()}
        style={{height: '200px', width: '400px'}}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}

        />
      </div>


    )
  }
}