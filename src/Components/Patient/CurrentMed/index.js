import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// CSS
import './index.css';

export default class CurrentMed extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user              : this.props.userID,
      patientId         : this.props.patID,

      medArray          : [],
      medsTableInfo     : [],
      currentMedicines  : [],

      patientsWeights   : [],
      currentWeight     : '',
    }
  }
 
  componentDidMount(){
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {

      let meds = [...res.patientsMedicines];
      let weightsCopy     = [...res.patientsWeights];
      let weightsSorted   = Calculations.sortByEventDate(weightsCopy);
      let wL              = weightsSorted.length;
      let cWeight         = weightsSorted[wL-1].weight;

     // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
      let medsTable = []; 
      let currentMeds = [];

  
      for (let k = 0; k < meds.length; k++){ // --> iteración medicinas

        let dName   = meds[k].drugName;
        let dunits  = meds[k].drugUnits;
        let index   = meds[k].dose.length; 
        let dDose   = meds[k].dose[index-1].dailyDose;
        let hDose   = meds[k].dose[index-1].hourlyDose;

        // medsTable recoge toda la info para mostrarla en el cuadro de registro de medicamentos
        medsTable[k] = {drugName: dName, dailyDose: dDose, hourlyDose: hDose, drugDose: dDose};

        let doseSorted = Calculations.sortMedicinesDate(meds[k].dose);
        let dL = doseSorted.length;
        let cDose = doseSorted[dL-1].dailyDose;


        if(cDose === 0){
          continue
        } else {
          currentMeds.push({medName: dName, medCDose: cDose, medUnit: dunits})
        }

      }

      this.setState({      // med oredered alpahbetically for listing purposes
        medsTableInfo     : medsTable,
        currentMedicines  : currentMeds,
        currentWeight     : cWeight,
      });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  componentDidUpdate(prevProps){
    if (this.props.cWeight !== prevProps.cWeight) {
      this.setState({
        currentWeight: this.props.cWeight
      });
    }
  }

  _renderMedicineCurrentDose(){
    
    return this.state.currentMedicines.map((meds,j) => {
      console.log('medicines = ',this.state.currentMedicines )
      return (
        
        <Link className="medicine-row" key={j} to={`/single_medicine_overview/${this.state.patientId}/${meds.medName}`}> 
        
          <div className="med-info-block">
            <p>{meds.medName}</p>
          </div>

          <div className="med-info-block">
            <p>{meds.medCDose} [{meds.medUnit}]</p> 
          </div>

          <div className="med-info-block">
            <p>{Number.parseFloat((Number(meds.medCDose)/ Number(this.state.currentWeight))).toFixed(1)} [{meds.medUnit}/Kg]</p> 
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
              {this.state.patientName === '' ? <p>LOADING !</p> :
            
                this._renderMedicineCurrentDose()
              }
            </div>
        </div>

    );
  };
};

