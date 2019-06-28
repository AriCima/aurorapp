import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../../../services/DataService';
import Calculations from '../../../services/Calculations';


// ACCESORIES
import AddButtonCool from '../../../Accessories/AddButtonCool'

// ECHARTS
// import BarsH from '../Cahrts/BarsH';

// MOMENT
// import moment from 'moment';

// CSS
import './index.css';

export default class CurrentMed extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user       : this.props.userID,
      patientId  : this.props.patID,
      cMeds      : [],
      cWeight    : null,
    };
  };
 
 componentDidMount(){
   const {userID, patID } = this.props;
   DataService.getPatMeds(userID, patID)
   .then(result => {
    let currentMeds = Calculations.getCurrentMeds(result);
    this.setState({
      cMeds: currentMeds
    })
   })
   DataService.getPatWeights(userID, patID)
   .then(result => {
     console.log('result del W =', result)
    let currentWeight = result[0].weight;

    this.setState({
      cWeight: currentWeight
    })
   })
 };
  

  _renderMedicineCurrentDose(){
    let meds = this.state.cMeds;
    let w = this.state.cWeight;

    // console.log('this.state.currentWeight',this.state.currentWeight )
    return meds.map((m,j) => {
      // console.log('medicines = ',this.state.currentMedicines )
      return (
        
        <Link className="medicine-row" key={j} to={`/single_medicine_overview/${this.state.patientId}/${meds.drugName}`}> 
        
          <div className="med-info-block">
            <p>{m.drugName}</p>
          </div>

          <div className="med-info-block">
            <p>{m.dailyDose} <span>[{m.drugUnits}]</span></p> 
          </div>

          <div className="med-info-block">
            <p>{Number.parseFloat((Number(m.dailyDose)/ Number(w))).toFixed(1)} <span>[{m.drugUnits}/Kg]</span></p> 
          </div>
        </Link>
      )
    })
  }  

  render() {

    const {patID, userID} = this.props;
    return (


      <div className="cMedicine-area">

        <div className="Cmedicine-upper">

          <div className="medicines-list-title">
            <h2>Medicación actual</h2>
          </div>

          <div className="med-add-button">
            <div>
              <Link to={`/medicine-input/${patID}`}>
                <AddButtonCool text={"Nuevo Medicamento"} userID={userID} patID={patID}/>
              </Link>
            </div>
          </div>

        </div>

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
          {this.state.medsArray === [] ? <p>LOADING !</p> :
        
            this._renderMedicineCurrentDose()
          }
        </div>

      </div>

    );
  };
};

