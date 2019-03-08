import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';
import { normalize } from 'path';

export default class CurrentMed extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,

      medsInfo          : [],
      medNames          : [],

      patientsWeights   : [],
      currentWeight     : '',
    }
  }
 
  componentDidMount(){

    DataService.getPatientsMeds(this.props.patID)
    .then(res => {
     
      let meds = res;
      let mL= meds.length;
      let medNames = [];

      for( let i = 0; i < mL; i++){
        let newMed = meds[i].drugName;

        medNames.indexOf(newMed) < 0 && medNames.push(newMed);
        
      }

      let mNL = medNames.length;
      let medsChart = [];

      for (let j = 0; j < mNL; j++){
        let name = medNames[j];
        let date = new Date(0);
        let unit = 'mg';
        let xDose = 0;

        for (let k = 0; k < mL; k++){
          if (name === meds[k].drugName && new Date(meds[k].date) > date){
            if (meds[k].dailyDose === 0){
              continue
            } else {
              xDose   = meds[k].dailyDose;
              date    = meds[k].date;
              unit    = meds[k].drugUnits;
            }
          }
        }

        let medToAdd = {drugName: name, dailyDose : xDose, drugUnits: unit};
        medsChart.push(medToAdd);
      }

      this.setState({
        medsInfo  : medsChart,
        medArray  : meds,
        medNames  : medNames
      })

    })
    .catch(function (error) {    
      console.log(error);
    });

    DataService.getPatientsWeights(this.props.patID)
    .then(weights => {

      let wSorted = Calculations.sortByDateAsc(weights);
      let wL = wSorted.length;

      let cWeight = wSorted[wL-1].weight;

      this.setState({
        currentWeight : cWeight
      })

    })
    .catch(function (error) {    
      console.log(error);
    });
  };
    

  _renderMedicineCurrentDose(){
    
    // console.log('this.state.currentWeight',this.state.currentWeight )
    return this.state.medsInfo.map((meds,j) => {
      // console.log('medicines = ',this.state.currentMedicines )
      return (
        
        <Link className="medicine-row" key={j} to={`/single_medicine_overview/${this.state.patientId}/${meds.medName}`}> 
        
          <div className="med-info-block">
            <p>{meds.drugName}</p>
          </div>

          <div className="med-info-block">
            <p>{meds.dailyDose} <span>[{meds.drugUnits}]</span></p> 
          </div>

          <div className="med-info-block">
            <p>{Number.parseFloat((Number(meds.dailyDose)/ Number(this.state.currentWeight))).toFixed(1)} <span>[{meds.drugUnits}/Kg]</span></p> 
          </div>
        </Link>
      )
    })
  }  

  render() {

    return (
        <div className="cMedicine-chart">

            <div className="cMedChart-header">

            <div className="med-title-box">
                <p id="p-med">Droga</p>
            </div>
            <div className="med-title-box">
                <p id="p-med">Dósis diaria</p>
            </div>
            <div className="med-title-box">
                <p id="p-med">Dósis / Peso</p>
            </div>

            </div>
            <div className="medicine-render">
              {this.state.medsInfo === undefined ? <p>LOADING !</p> :
            
                this._renderMedicineCurrentDose()
              }
            </div>
        </div>

    );
  };
};

