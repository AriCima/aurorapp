import React from 'react';
import ReactEcharts from 'echarts-for-react';  // or var ReactEcharts = require('echarts-for-react');
import 'echarts/lib/chart/pie';


export default class PieChart extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      title       : this.props.title,
      subText     : this.props.subText,

      data       : this.props.data,
       
      height      : this.props.h,
      width       : this.props.w,
        
      // xPointer    : this.props.xPointer,
      // left        : this.props.left,
      // top         : this.props.top,
      // right       : this.props.right,
      // bottom      : this.props.bottom,
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log('DID UPDATE LAUNCHED')
    if(this.props.data !== prevProps.data ){
      this.setState({
        data       : this.props.data,  
      })
    }
  }

  // data structure:
  // data:[
  //   {value:348, name: '1'},
  //   {value:535, name: '2'},
  //   {value:510, name: '3'},
  //   {value:634, name: '4'},
  //   {value:735, name: '5'}
  // ],

  _getOption(){

    let option = {
      title: {
        text: this.state.title,
        subtext: this.state.subText,
        left: 'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      
      series : [
        {
          type: 'pie',
          radius : '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: this.state.data,
          itemStyle: {
            emphasis: {
              shadowBlur: 100,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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
          style={{height: this.props.h, width: this.props.w}}
          notMerge={true}
          lazyUpdate={true}
          theme={"theme_name"}
        />
      </div>


    )
  }
}