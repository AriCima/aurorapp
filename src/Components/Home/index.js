import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// COMPONENTS
import AddButtonCool from '../Accessories/AddButtonCool';


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
      userPatients   : [],
      currentMonth   : Calculations.getCurrentMonth()
    }
 
  };


  componentDidMount() {

    if (this.state.userId) {

      DataService.getUserPatients(this.state.userId)
      .then(patients => {

        this.setState({
          userPatients : patients
        });
        
      }).catch(function (error) {   
        // handle error
        console.log(error);
      })
   
    }
  };

  _renderPatients(){
    console.log('patients = ', this.state.userPatients)
    return this.state.userPatients.map((patts,j) => {
      
      return (
        <Link className="patient-container" key={j} to={`/patient/${patts.id}`}>
          <div className="ptts-info-block">
              <p>{patts.patientName}  {patts.patientSurname} </p>
          </div>
        </Link>

        
      )
    })
  };


  render() {

    if (!this.props.userID) return <p>Loading  ...</p>;

    return (

      <div className="home">

        <div className="home-upper">

          <div className="home-add-button">
              <div>
                  <Link to={`/add_patient/${this.state.userId}`}><AddButtonCool text={'Nuevo Paciente'}/></Link>
              </div>
          </div>

          <div className="home-title">
            <h2>Listado de pacientes</h2>
          </div>

          
        </div>

        <div className="patients-list">
          <div className="renderFn">
            {this._renderPatients()}  
          </div>
        </div>
      </div>

    )

  }
}



