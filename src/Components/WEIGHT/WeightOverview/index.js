import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// MATERIAL-UI
import AddButtonCool from '../../Accessories/AddButtonCool';

// CHARTS
import Lines from '../../Accessories/Charts/Lines';
import EChartsLines from '../../Accessories/Charts/EChartsLines';

import './index.css'; 

export default class WeightOverview extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      patientId       : this.props.patID,
      patientsWeights : [],
      dataPoints      : [],

      //eCharts
      xData           : [],
      sData           : [],
    };
    this._renderWeightsInfo = this._renderWeightsInfo.bind(this);
  }

  componentDidMount(){	

    DataService.getPatientsWeights(this.state.patientId)	
    .then(res => {
      
      let weights   = Calculations.sortByDateAsc(res);
      let indexW    = weights.length;

      // DATA FOR CANVAS CHARTS
      let dPoints   = [];
      for (let i = 0; i < indexW; i++){
        let nDate = weights[i].date;
        let val = weights[i].weight;
        let data = {x: new Date(nDate), y: val }
        dPoints[i] = data;
      }

      // DATA FOR ECHARTS
      let datas   = [];
      let dates   = [];
      for (let i = 0; i < indexW; i++){
        // console.log('weights[i].date =', weights[i].date)
        // console.log('Number(weights[i].weight) =', Number(weights[i].weight))
        let nDate = weights[i].date;
        let val = Number(weights[i].weight);
        datas[i] = val;
        dates[i] = nDate
      }

      // console.log('dates / datas ', dates, ' / ', datas)
      this.setState({ 	
        patientsWeights : weights,
        dataPoints      : dPoints,
        xData           : dates,
        sData           : datas,

      });	
      // console.log('dates / datas ', this.state.xData, ' / ', this.state.sData)
    })	
    .catch(function (error) {    	
      console.log(error);	
    })    	
  }

  _renderWeightsInfo(){ 
    
    return this.state.patientsWeights.map((wts,j) => {
      return (
        <div className="list-container">
          <Link className="standard-list-row" key={j} to={`/single_weight_overview/${this.state.patientId}/${wts.id}`}> 
          
            <div className="standard-list-info-block">
               <p>{wts.date}</p>
            </div>

            <div className="standard-list-info-block">
                <p>{wts.weight}</p>
            </div>

          </Link>
        </div>
      )
    })
  };
    
  _chartInput(){}

  
  render() {

    return (
          
      <div className="weights-area">

            <div className="weights-upper">

              <div className="title-row">

                <div className="weights-list-title">
                  <h2>Evolución del peso</h2>
                </div>

                <div className="wt-add-button">
                  <div>
                    <Link to={`/patient_new_weight/${this.state.patientId}`}><AddButtonCool text={'Nuevo Peso'}/></Link>
                  </div>
                </div>

              </div>
                <div className="weight-chart-wrapper">
                  <div className="weight-chart">
                    <EChartsLines 
                      xD   = {this.state.xData} 
                      sD   = {this.state.sData}
                      h       = {'400px'}
                      w       = {'600px'}
                      yName   = {'[kg]'} 
                      left    = {'20px'}
                      top     = {'60px'}
                      right   = {0}
                      bottom  = {0}
                      nameGap = {20}
                    />
                  </div>
                </div>

                

            </div>

          <div className="standard-list-header">
            <ul>
              <li id="double-line">Fecha</li>
              <li id="double-line">Peso <br/>Kg</li>
            </ul>
          </div>
          
            {this.state.patientsWeights === [] ? <p>LOADING !</p> :
              this._renderWeightsInfo()
            }   
         
        </div>

         



      
    );
  }
}
