// var React = require('react');
// var Component = React.Component;
// var CanvasJSReact = require('../canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;


// export default class Lines extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             title           : this.props.title,
//             yTitle          : this.props.yTitle,
//             dataPoints      : this.props.dataPoint,
//             xValuesFormat   : this.props.xFormat
//         }
//     }

//     _getOptions(){
//         const options = {
// 			animationEnabled: true,
// 			title:{
// 				text: this.state.title
// 			},
// 			axisX: {
// 				valueFormatString: this.props.xFormat,
// 			},
// 			axisY: {
// 				title: this.props.yTitle,
// 				prefix: "$",
// 				includeZero: false
// 			},
// 			data: [{
// 				yValueFormatString: "$#,###",
// 				xValueFormatString: "MMMM",
// 				type: "spline",
//                 dataPoints: this.props.dataPoint,
//                 //[
// 					// { x: new Date(2017, 0), y: 25060 },
// 					// { x: new Date(2017, 1), y: 27980 },
// 					// { x: new Date(2017, 2), y: 42800 },
// 					// { x: new Date(2017, 3), y: 32400 },
// 					// { x: new Date(2017, 4), y: 35260 },
// 					// { x: new Date(2017, 5), y: 33900 },
// 					// { x: new Date(2017, 6), y: 40000 },
// 					// { x: new Date(2017, 7), y: 52500 },
// 					// { x: new Date(2017, 8), y: 32300 },
// 					// { x: new Date(2017, 9), y: 42000 },
// 					// { x: new Date(2017, 10), y: 37160 },
// 					// { x: new Date(2017, 11), y: 38400 }
// 				//]
// 			}]
// 		}

//         return options
       
//     }

// 	render() {
		
// 		return (
// 		<div>
// 			<CanvasJSChart options = {this._getOptions()}
// 				onRef={ref => this.chart = ref}
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }
  