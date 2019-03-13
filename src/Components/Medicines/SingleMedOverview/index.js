import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// COMPONENTS

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// ACCESOIRES
import AddButtonCool from '../../Accessories/AddButtonCool';

import './index.css'; 

export default class SingleMedOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId         : this.props.patID,
            drugName          : this.props.dName,
            
            medObj : {drugName: '', allDoses: [ {hourlyDose: []} ] },

            patientsWeights   : [],
            currentWeight     : '',
            timeLine          : '',
        };

        this.handleChange = this.handleChange.bind(this);
    }


    componentDidMount(){
        
        DataService.getPatientsMeds(this.props.patID)
        .then(res => {
            
          let meds      = res;
          let mL        = meds.length;
          let medName   = [{drugName: this.props.dName, allDoses:[]}];
    
          let medicines = Calculations.getSortedMedicines(medName, meds);  // medicines = [drugName: name, allDoses: [{}, {} . . {}] allDoses sorted descendently (curren dose = position  0)
          
          console.log('medicines = ', medicines);
          
          this.setState({
            medObj  : medicines[0],
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
        

    handleChange(event) {
        let newTime = event.target.value       
        this.setState({
            timeLine: newTime
        });
    }

    _renderMedicinesInfo(mObj){ 	

        let hDose = mObj.allDoses[0].hourlyDose;

       //estructura del medObj = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},	
      
        return (	
            <div className="smedicine-container" >	

                <div className="smedicine-row">
                    {this._renderMedicineDose(hDose)}	
                </div>
                <div id="sratio-field">	
                    <p>{Number.parseFloat((Number(mObj.dailyDose)/ Number(this.state.currentWeight))).toFixed(1)} <span>[{mObj.drugUnits}/Kg]</span></p>
                </div>

                
            </div>	
        )	
     	
    };	

    _renderMedicineDose(x){	
        return x.map((dose, j) => {	
        return (	
            <div key={j} className="sdose-fields">	
            <p>{dose}</p>	
            </div>	
        )	
        })	
    };
  
  render() {
    console.log('medObj.allDoses  =', this.state.medObj.allDoses[0])
    return (
        <div className="smed-over-wrapper">

            <div className="smedicines-list-area">
            
                <div className="s-upper">
                    <div className="s-list-title">
                        <h2>Dosis díaria actual de <span>{this.props.dName}</span></h2>
                    </div>
                    <div className="smed-add-button">
                        <div>
                            <Link to={`/patient_new_medicine/${this.state.patientId}`}><AddButtonCool text={'Modificar dosis'}/></Link>
                        </div>
                    </div>
                </div>

                <div className="s-drugs-list-header">
                    <ul id="days-list">
                        {/* <li id="drug-field">Droga</li> */}
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
                
                {this.state.medObj === {drugName: '', allDoses: []} ? <p>LOADING !</p> : this._renderMedicinesInfo(this.state.medObj)}

            </div>

            <div className="regisro-smed-weight">

                <div className="list-title">
                    <h2>Registro historico de dosis</h2>
                </div>

                {/* <form className="select-timeline">
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
                </form> */}

                <div className="rmw-graphic-big">
                    <div className="graphico">

                        {/* <MedWeightGraphic 
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
                        /> */}
                    </div>
                </div>
            </div>
            
        </div>
      
    );
  };
};

