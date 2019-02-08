import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// Components
import EChart from '../Cahrts/ECharts';

// CSS
import './index.css';

export default class MedWeightGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,

      patientsMedicines : [],
      weightsSorted     : [],

      timeLineDays      : 120,
    }
  }

  componentDidMount(){
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {

      let meds            = [...res.patientsMedicines];
      let weightsCopy     = [...res.patientsWeights];
      let wSorted         = Calculations.sortByDateAsc(weightsCopy);
      let wL              = wSorted.length;

      this.setState({      
        patientMedicines  : meds,
        weightsSorted     : wSorted,
      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  componentDidUpdate(prevProps){
    if (this.props.cWeight !== prevProps.cWeight) {
        this.setState({
            currentWeight: this.props.cWeight});
    }
  }

  _medWeightGraphicData(){

    let chartInfo = [];
    let meds      = this.state.patientsMedicines;
    let mL        = meds.length;
    let weights   = this.state.weightsSorted;
    let wL        = this.state.weightsSorted.length;
    let daysBack  = this.state.timeLineDays;

    //Cálculo de la fecha inicial
    let today = new Date();
    let startDay = moment(today).subtract(daysBack, 'days').format('DD-MMM-YYYY');

    let monthsBack = Number(daysBack)/30;

    let xData = [];
    let serieData = [[]];
    let weightsData = []

    // ITERAMOS POR LOS DÍAS
    for(let j = 0; j <= daysBack; j++){
      // GENERAMOS ARRAYS DE DÍAS FROMATEADOS
      let dayToAdd = moment(today).subtract(daysBack-j, 'd').format('DD-MMM-YYYY');
      xData[j] = dayToAdd;
     
      // ITERAMOS SOBRE CADA MEDICINE 
      for(let m = 0; m < mL; m++){
        let dL = meds[m].dose.length;

        // ITERAMOS POR LAS DOSIS Y VERIFICAMOS SI LA FECHA DEL REGISTRO FORMATEADA === FECHA
        for (let d = 0; d < dL; d++){
          serieData[m][j] =  null;

          let medDate = moment(new Date(meds[m].dose[d].date)).format('DD-MMM-YYYY');

          if (xData[j] === medDate){
            serieData[m][j] = meds[m].dose[d].dailyDose;
          } else if (xData[j] !== medDate && d>=1) {
            serieData[m][j] = meds[m].dose[d-1].dailyDose;
          }
        }
        
      }

      
      // ITERAMOS SOBRE CADA PESO
      for(let w = 0; w < wL; w++){
        weightsData[j] = null;
        let wDate = moment(new Date(weights[w].date)).format('DD-MMM-YYYY');
        if (xData[j] === wDate){
          weightsData[j] = Number(weights[w].weight);
        } else if (xData[j] !== wDate && w>=1) {
          weightsData[j] = Number(weights[w-1].weight);
        }
      }

    };

    serieData.push(weightsData)

    chartInfo = [xData, serieData]

    console.log('Cahrtinfo', chartInfo)

    return chartInfo

  }
  
  render() {
    let xD = this._medWeightGraphicData()[0];
    let sD = this._medWeightGraphicData()[1];
    return (

    
      <div className="events-chart">

        {this.state.patientName === '' ? <p>LOADING !</p> : <div>
          {xD} --- {sD}
          <EChart xData={xD} sData={sD}/>
          </div>
        }

      </div>
         

    );
  };
};

