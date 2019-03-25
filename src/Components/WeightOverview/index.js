import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import AddButtonCool from '../Accessories/AddButtonCool';

import './index.css'; 

export default class WeightOverview extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        patientId       : this.props.patID,
        patientsWeights : [],
      };
      this._renderWeightsInfo = this._renderWeightsInfo.bind(this);
    }

    componentDidMount(){	

      DataService.getPatientsWeights(this.state.patientId)	
      .then(res => {
        
        let weights = Calculations.sortByDateDesc(res);
        console.log('weights', weights);


        this.setState({ 	
          patientsWeights : weights
        });	
        console.log('patientsWeights', this.state.patientsWeights)
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
    

  
  render() {

    return (
          
        <div className="weights-area">

            <div className="weights-upper">
                <div className="weights-list-title">
                <h2>Registro del peso</h2>
                </div>
                
                <div className="wt-add-button">
                    <div>
                        <Link to={`/patient_new_weight/${this.state.patientId}`}><AddButtonCool text={'Nuevo Evento'}/></Link>
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
