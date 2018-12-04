import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// MATERIAL UI
import AddButton from '../../Components/Accessories/AddButton';

// DATA
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// CSS
import './index.css';



export default class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userId         : this.props.userID,
      patients       : [],
      currentMonth   : Calculations.getCurrentMonth()
    }
 
  };


  componentDidMount() {
    if (this.state.userId) {
    this._loadData(this.state.userId);
    this.setState()
    }
  };

  _loadData(userId){

    DataService.getUserPatients(userId)
    .then(ptts => {
      const patients = [];
      for (let j = 0; j < ptts.length; j++){
        patients[j]={
          patientName   : ptts[j].patientName,
          id            : ptts[j].id,
        };
      };
  
      this.setState({ patients });
      //console.log('patients luego de aptName e ID', this.state.patients)
    }).catch(function (error) {   
      // handle error
      console.log(error);
    })
  };

  _renderPatients(){
    return this.state.patients.map((patts,j) => {
      return (
        <div className="list-container">
          <Link className="ptts-row" key={j} to={`/single_patient_overview/${patts.id}`}> 
            <div className="ptts-info-block">
               <p>{patts.patientName}</p>
            </div>
            <div className="ptts-info-block">
                <p>{patts.bornDate}</p>
            </div>
          </Link>

        </div>
      )
    })
  };


  render() {

    if (!this.props.userID) return <p>Loading  ...</p>;

    return (


      <div className="home-super-container">
        
        <div className="units-list">

          <div className="page-title">
            <h3>Listado de pacientes</h3>
          </div>

          <div className="units-list-header">
            <ul>
              <li>Nombre</li>
              <li>Fecha de Nacimiento</li>
            </ul>     
          </div>

          <div className="units-list-super-container">
            {this.state.patients.length === 0? 
              <div className="no-ptts-message">
                <div className="line-centered">
                  <p>No tienes ningún paciente listado !</p>
                </div>
                <div className="line-centered">
                  <p>Haz Click en <span>Nuevo Paciente</span> para comenzar</p>
                </div>
              </div> 
              : this._renderPatients() }     
          </div>

          <div className="add-button-left">
            <div id="add-button">
              <div>
                <p>Nuevo Paciente</p>
              </div>
              <div>
                <Link to={`/add_patient/${this.state.userId}`}><AddButton/></Link>
              </div>

          </div>

        </div>

      </div>

      </div>
    )

  }
}



