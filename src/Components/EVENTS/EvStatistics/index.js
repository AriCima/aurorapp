import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// SERVICE API
import DataService from "../../services/DataService";
import Calculations from "../../services/Calculations";

// CHART
import PieChart from "../../Accessories/Charts/PieChart";

// CSS
import "./index.css";

export default class EvStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patID,
      patientsEvents: [],
      typeStatistics: [],
      detoStatistics: [],
    };
  }

  componentDidMount() {

    // PieChart data structure 
    //  data:[
    //     {value:348, name: '1'},
    //     {value:535, name: '2'},
    //     {value:510, name: '3'},
    //     {value:634, name: '4'},
    //     {value:735, name: '5'}
    //  ],

    DataService.getPatientsEvents(this.state.patientId)
    .then(res => {
      const evts      = res;
      let eSorted     = Calculations.sortByDateAsc(evts);
      let eLength     = eSorted.length;

      console.log('evts = ', evts)

      
      let detos = [];
      let intens = [];
      let states = [];
      let tStats= [];
      let dStats= [];
      let iStats= [];
      let sStats = [];
      let types = [];

      for (let i=0; i<eLength; i++){
        // console.log('type and deto = ', evts[i].type, ' / ', evts[i].detonation, ' / ', types)
        let newT = evts[i].type;
        let newD = evts[i].detonation;

        // GET ARRAY WITH EACHT TYPE AND ITS AMMOUNT
        if(types.indexOf(newT) < 0){
          types.push(newT);
          let newQ = 1;
          let newTStat = {value: newQ, name: newT}
          tStats.push(newTStat);
        } else {
          let index = tStats.map(function(e) { return e.name; }).indexOf(newT);
          let transVal = tStats[index].value;
          tStats[index].value = transVal+1;
        };

        // GET ARRAY WITH EACHT DETO AND ITS AMMOUNT
        if(detos.indexOf(newD) < 0){
          detos.push(newD);
          let newQ = 1;
          let newDStat = {name: newD, value: newQ};
          dStats.push(newDStat);
        } else {
          console.log('dStats =', dStats)
          console.log('newD', newD)
          let index = dStats.map(function(e) { 
            console.log('e ',e);
            return e.name; }).indexOf(newD);
          console.log('index = ', index)
          let transVal = dStats[index].value;
          dStats[index].value = transVal+1;
        };

      };
      
      // let tL = tStats.length;
      // let dL = dStats.length;

      // for(let j = 0; j < tL; j++){
      //   let q = tStats[j].qty;
      //   let percent = ((q/eLength)*100).toFixed(1);
      //   tStats[j].qty = percent;
      // }

      // for(let j = 0; j < dL; j++){
      //   let q = dStats[j].qty;
      //   let percent = ((q/eLength)*100).toFixed(1);
      //   dStats[j].qty = percent;
      // }

      console.log('tStats / dStats = ', tStats , ' / ', dStats)

      this.setState({
        typeStatistics: tStats,
        detoStatistics: dStats,
      })
      
    })
    .catch(function (error) {    
      console.log(error);
    })    

    
  }



  _renderTypeStats() {
    // console.log('typeStats = ', this.state.typeStatistics)
    return this.state.typeStatistics.map((evts, j) => {
      return (
        <div className="ev-stats-container">
          <p>{evts.type}: {evts.qty}%</p>
        </div>
      );
    });
  };

  _renderDetoStats() {
    // console.log('detoStats = ', this.state.detoStatistics)
    return this.state.detoStatistics.map((det, j) => {
      return (
        <div className="ev-stats-container">
          <p>{det.deto}: {det.qty}%</p>
        </div>
      );
    });
  };

  // _renderIntensityStats() {
  //   return this.state.patientsIntens.map((evts, j) => {
  //     return (
  //       <div className="ev-stats-container">
  //         <p>{evts.intens}: {evts.iPercent}</p>
  //       </div>
  //     );
  //   });
  // };

  // _renderStateStats() {
  //   return this.state.patientsState.map((evts, j) => {
  //     return (
  //       <div className="ev-stats-container">
  //         <p>{evts.states}: {evts.sPercent}</p>
  //       </div>
  //     );
  //   });
  // };

  render() {
    return (
      <div className="ev-stats">

        <div className="ev-stats-upper">
          {/* <div className="ev-stats-title">
            <h2>Tipo de Eventos</h2>
          </div> */}
        </div>

       

        <div className="ev-stats-wrapper">
          <div className="ev-stats-fn-wrapper">
            {this.state.patientsEvents === [] ? (
              <p>LOADING !</p>
            ) : (
              <div>
                <PieChart 
                  title={''}
                  subText={''}
                  data={this.state.typeStatistics}
                  h={'200px'}
                  w={'300px'}
                />
              {/* <p> Type stats:</p> {this._renderTypeStats()}
              <p> Detos stats:</p> {this._renderDetoStats()} */}
              {/* <p> Intensity stats:</p> {this._renderIntensityStats()}
              <p> State stats:</p> {this._renderStateStats()} */}
              </div>
            )}
          </div>
        
        </div>
      </div>
    );
  }
}
