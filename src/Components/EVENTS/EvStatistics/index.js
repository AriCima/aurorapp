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
      h:  '300px',
      v:  '300px',
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

      console.log('tStats / dStats = ', tStats , ' / ', dStats)

      this.setState({
        typeStatistics: tStats,
        detoStatistics: dStats,
      })
      
    })
    .catch(function (error) {    
      console.log(error);
    })    

  };

  render() {
    return (
      <div className="ev-stats">

        <div className="ev-stats-graph">

          
          {this.state.patientsEvents === [] ? 
            (
              <p>LOADING !</p>
            ) : 
            (
              
              <PieChart 
                title={'Tipo de Eventos'}
                subText={'  '}
                data={this.state.typeStatistics}
                sName={'Tipo de Evento'}
                h={this.state.h}
                w={this.state.v}
              />
              
            )
          }
        </div>

        <div className="ev-stats-graph">
          
          {this.state.patientsEvents === [] ? (
            <p>LOADING !</p>
            ) : (
              
              <PieChart 
                title={'Detonantes'}
                subText={'  '}
                data={this.state.detoStatistics}
                sName={'Tipo de Detonante'}
                h={this.state.h}
                w={this.state.v}
              />
              
            )
          }
          
        </div>
        
      </div>
    );
  }
}
