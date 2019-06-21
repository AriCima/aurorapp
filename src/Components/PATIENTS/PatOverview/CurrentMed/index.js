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
      user              : this.props.userID,
      patientId         : this.props.patID,
      medsArray         : [],
      currentWeight     : '',
    }
  }
 
  // componentDidMount(){

  //   DataService.getPatientsMeds(this.props.patID)
  //   .then(res => {
     
  //     let meds      = res;
  //     let mL        = meds.length;
  //     let onlyNames = [];
  //     let medNames  = [];

  //     for( let i = 0; i < mL; i++){
  //       if (onlyNames.indexOf(meds[i].drugName) < 0){
  //         onlyNames.push(meds[i].drugName);
  //         let newMed    = {drugName: meds[i].drugName, allDoses: []};
  //         // console.log('newMed', newMed)
  //         medNames.push(newMed);
  //       }
  //     }

  //     let medicines = Calculations.getSortedMedicines(medNames, meds);
  //     // medicines = [drugName: name, allDoses: [{}, {} . . {}] allDoses sorted descendently (curren dose = position  0)
      

  //     this.setState({
  //       medsArray  : medicines,
  //     })
       
  //   })
  //   .catch(function (error) {    
  //     console.log(error);
  //   });

  //   DataService.getPatientsWeights(this.props.patID)
  //   .then(weights => {

  //     let wSorted = Calculations.sortByDateAsc(weights);
  //     let wL = wSorted.length;

  //     let cWeight = wSorted[wL-1].weight;

  //     this.setState({
  //       currentWeight : cWeight
  //     })

  //   })
  //   .catch(function (error) {    
  //     console.log(error);
  //   });
  // };
    
 componentDidMount(){
   const {userID, patID } = this.props;
   console.log('current med userID, patID = ', userID, ' / ', patID)
   DataService.getPatMeds(userID, patID)
   .then(result => {
    console.log('el result en CurrenMed = ', result)
   })
 }
  

  _renderMedicineCurrentDose(){
    
    // console.log('this.state.currentWeight',this.state.currentWeight )
    return this.state.medsArray.map((meds,j) => {
      // console.log('medicines = ',this.state.currentMedicines )
      return (
        
        <Link className="medicine-row" key={j} to={`/single_medicine_overview/${this.state.patientId}/${meds.drugName}`}> 
        
          <div className="med-info-block">
            <p>{meds.drugName}</p>
          </div>

          <div className="med-info-block">
            <p>{meds.allDoses[0].dailyDose} <span>[{meds.allDoses[0].drugUnits}]</span></p> 
          </div>

          <div className="med-info-block">
            <p>{Number.parseFloat((Number(meds.allDoses[0].dailyDose)/ Number(this.state.currentWeight))).toFixed(1)} <span>[{meds.drugUnits}/Kg]</span></p> 
          </div>
        </Link>
      )
    })
  }  

  render() {

    console.log('props en el cMed = ', this.props)
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

