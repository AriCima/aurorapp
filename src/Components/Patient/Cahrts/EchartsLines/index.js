import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/line';


export default class EChartsLines extends React.Component {
    constructor(props){
      super(props);
  
      this.state = {
        xData   : this.props.xData,
        seriesData : this.props.sData,
        
      }
    }

    getOption(){
      option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    };

    }

    render() {
  
        return (
            <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={"theme_name"}
            onChartReady={this.onChartReadyCallback}
            onEvents={EventsDict}
            opts={} 
            />
        )
    }
}