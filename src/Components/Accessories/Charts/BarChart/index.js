import React from "react";
import CanvasJS from 'canvasjs';  // https://canvasjs.com/react-charts/bar-chart/

// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xTitle      : this.props.xTitle,
            yTitle      : this.props.yTitle,
            dataPoints  : this.props.dataPoint,
            
            // height      : this.props.h,
            // width       : this.props.w,
           
            // left        : this.props.left,
            // top         : this.props.top,
            // right       : this.props.right,
            // bottom      : this.props.bottom,
        }
    
    }

    _getOptions(){
        const options ={
            animationEnabled: true,
            theme: "light2",
            title:{
                text: "Most Popular Social Networking Sites"
            },
            axisX: {
                title: "Social Network",
                reversed: true,
            },
            axisY: {
                title: "Monthly Active Users",
                labelFormatter: this.addSymbols
            },
            data: [{
                type: "bar",
                dataPoints: this.state.dataPoints,
                // [
                //     { y:  2200000000, label: "Facebook" },
                //     { y:  1800000000, label: "YouTube" },
                //     { y:  800000000, label: "Instagram" },
                //     { y:  563000000, label: "Qzone" },
                //     { y:  376000000, label: "Weibo" },
                //     { y:  336000000, label: "Twitter" },
                //     { y:  330000000, label: "Reddit" }
                // ]
            }]
        }

        return options
       
    }

    _addSymbols(e){
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
        if(order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }



	render() {
        return (
            <div>
                <CanvasJSChart options = {this._getOptions()}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        )
    }
	
};
                   