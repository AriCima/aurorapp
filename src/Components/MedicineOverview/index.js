import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// COMPONENTS
import MedWeightGraphic from '../Patient/MedWeightGraphic';
import LinesTest from '../Patient/Cahrts/LinesTest';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// ACCESOIRES
import AddButtonCool from '../Accessories/AddButtonCool';

import './index.css'; 

export default class MedicineOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId         : this.props.patID,
            drugName          : this.props.dName,
            medsTableInfo     : [],
            patientMedicines  : [],	
            currentMedicines  : [],
            currentWeight     : '',
            timeLine          : '30',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){	

        DataService.getPatientInfo(this.state.patientId)	
       .then(res => {	
            let meds =  [...res.patientsMedicines];	
            let weightsCopy     = [...res.patientsWeights];
            let weightsSorted   = Calculations.sortByEventDate(weightsCopy);
            let wL              = weightsSorted.length;
            let cWeight         = weightsSorted[wL-1].weight;
    
    
            // console.log('pat.patientsEvents / pat.patientsWeights = ' ,pat.patientsEvents, ' / ', pat.patientsWeights )	
            // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/	
        
            //estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},	
            let medsTable = []; 	
            let currentMeds = [];	
            for (let k = 0; k < meds.length; k++){ // --> iteración medicinas	
                let dName   = meds[k].drugName;	
                let dunits  = meds[k].drugUnits;	
                let index   = meds[k].dose.length;	
                let dDose   = meds[k].dose[index-1].dailyDose;	
                let hDose   = meds[k].dose[index-1].hourlyDose;
                let ratio   = Number.parseFloat((Number(dDose)/ Number(cWeight))).toFixed(1);

                // medsTable recoge toda la info para mostrarla en el cuadro de registro de medicamentos	
                medsTable[k] = {drugName: dName, dailyDose: dDose, hourlyDose: hDose, drugDose: dDose, drugUnit: dunits, drugRatio: ratio};	        
                let doseSorted = Calculations.sortMedicinesDate(meds[k].dose);	
                let dL = doseSorted.length;	
                let cDose = doseSorted[dL-1].dailyDose;	
    
    
                if(cDose === 0){	
                    continue	
                } else {	
                    currentMeds.push({medName: dName, medCDose: cDose, medUnit: dunits, drugRatio: ratio})	
                }	
    
            }	
   
          // console.log('el currentMeds = ', currentMeds)	
   
          this.setState({ 	
            patientMedicines  : res.patientMedicines,      // med oredered alpahbetically for listing purposes	
            medsTableInfo     : medsTable,	
            currentMedicines  : currentMeds,	
            currentWeight     : cWeight,
   
          });	
          console.log('medicineTable = ', medsTable)
        })	
       .catch(function (error) {    	
         console.log(error);	
       })    	
    }

    handleChange(event) {

        console.log('event', event.target.value)

        let newTime = event.target.value
        console.log('newTime', newTime)
       
        this.setState({
            timeLine: newTime
        });

        console.log('this.state.timeLine', this.state.timeLine)
    }

    _renderMedicinesInfo(){ 	

       //estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},	
       return this.state.medsTableInfo.map((meds,j) => {	
            return (	
                <div className="medicines-container" key={j}>	
                    <Link className="medicine-row"  to={`/single_medicine_overview/${this.state.patientId}/${meds.drugName}`}> 	
                    
                        <div id="drug-field">	
                            <h4>{meds.drugName}</h4>	
                        </div>	

                        {this._renderMedicineDose(meds.hourlyDose)}	

                        <div id="ratio-field">	
                            <p>{meds.drugRatio} {meds.drugUnit}/Kg</p>	
                        </div>	

                    </Link>	
                </div>	
            )	
        })	
    };	

    _renderMedicineDose(x){	
        return x.map((dose, j) => {	
        return (	
            <div key={j} className="dose-fields">	
            <p>{dose}</p>	
            </div>	
        )	
        })	
    };
  
  render() {
    //   console.log('render launched')
    console.log('timeLine render', this.state.timeLine)
    return (

        <div className="med-over-wrapper">

            <div className="medicines-list-area">
            
                <div className="upper">
                    <div className="list-title">
                        <h2>Dosis díaria de medicamentos</h2>
                    </div>
                    <div className="med-add-button">
                        <div>
                            <Link to={`/patient_new_medicine/${this.state.patientId}`}><AddButtonCool text={'Modificar / agregar medicamentos'}/></Link>
                        </div>
                    </div>
                </div>

                <div className="drugs-list-header">
                    <ul id="days-list">
                        <li id="drug-field">Droga</li>
                        <li className="single-day">0</li>
                        <li className="single-day">1</li>
                        <li className="single-day">2</li>
                        <li className="single-day">3</li>
                        <li className="single-day">4</li>
                        <li className="single-day">5</li>
                        <li className="single-day">6</li>
                        <li className="single-day">7</li>
                        <li className="single-day">8</li>
                        <li className="single-day">9</li>
                        <li className="single-day">10</li>
                        <li className="single-day">11</li>
                        <li className="single-day">12</li>
                        <li className="single-day">13</li>
                        <li className="single-day">14</li>
                        <li className="single-day">15</li>
                        <li className="single-day">16</li>
                        <li className="single-day">17</li>
                        <li className="single-day">18</li>
                        <li className="single-day">19</li>
                        <li className="single-day">20</li>
                        <li className="single-day">21</li>
                        <li className="single-day">22</li>
                        <li className="single-day">23</li>
                        <li id="ratio-field">Ratio</li>
                    </ul>
                </div> 

                {this._renderMedicinesInfo()}    

            </div>

            <div className="regisro-med-weight">

                <div className="list-title">
                    <h2>Registro historico de dosis</h2>
                </div>

                <form className="select-timeline">
                    <p>Seleccione horizonte de tiempo</p>
                    <select className="select-box"
                        value={this.state.timeLine} 
                        onChange={this.handleChange}>
                        <option value="30">30 días</option>
                        <option value="60">60 días</option>
                        <option value="90">90 días</option>
                        <option value="365">1 año</option>
                        <option value="all">Historial completo</option>
                    </select>
                </form>

                <div className="rmw-graphic-big">
                    <div className="graphico">

                        {/* <LinesTest /> */}
                        <MedWeightGraphic 
                            patID={this.props.patID} 
                            tLine={this.state.timeLine} 
                            w={'1000px'} 
                            h={'500px'}
                            yName={'dosis por kg'}
                            nameGap={'30px'}
                            left = {'50px'}
                            top = {'10px'}
                            right= {'0px'}
                            bottom= {'5px'}
                        />
                    </div>
                </div>
            </div>
            
        </div>
      
    );
  };
};

