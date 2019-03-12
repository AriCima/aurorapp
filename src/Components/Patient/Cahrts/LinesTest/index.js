import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/line';


export default class LinesTest extends React.Component {
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
        data          : ['Jan', 'Feb','Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

      series: [{
               
        type:'line',
            step: 'end',
            data:[450, 432, 401, 454, 590, 530, 510, 454, 590, 530, 510, 200]
        },
        {
          type:'line',
          step: 'start',
          data:[250, 132, 301, , 54, 59, 230, 510, 200],
          smooth: false,
      },
      ],
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
        style={{height: '600px', width: '1000px'}}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}

        />
      </div>


    )
  }
}