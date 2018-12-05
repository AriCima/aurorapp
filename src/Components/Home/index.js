import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
    this._loadData(this.state.userId);
   
    }
  };

  _loadData(userId){

    DataService.getUserInfo(userId)
    .then(ptts => {
      console.log('el ptts recibido en home es: ', ptts)
      this.setState({
        userPatients : ptts.userPatients
      });
      
    }).catch(function (error) {   
      // handle error
      console.log(error);
    })
  };

  _renderPatients(){
    return this.state.userPatients.map((patts,j) => {
      console.log('el patts es = ', patts);
      return (
        <div className="patient-container">
          <Link className="pat-box" key={j} to={`/patient/${patts.patientId}`}> 
            <div className="ptts-info-block">
               <p>{patts.patientName} </p>
            </div>
            <div className="ptts-info-block">
               <p>{patts.patientSurname} </p>
            </div>
          </Link>

        </div>
      )
    })
  };


  render() {

    

    if (!this.props.userID) return <p>Loading  ...</p>;

    return (

      <div className="home">

        <div className="home-title">
          <h3>Listado de pacientes</h3>
        </div>

        <div className="patients-list">
          <div className="renderFn">
            {this._renderPatients()}  
          </div>

          <button className="patient-container">
            <Link to={`/add_patient/${this.state.userId}`}>
              <div className="ptts-info-block">
                <h4>Nuevo Paciente</h4>
              </div>
            </Link>
          </button>
        </div>
      </div>

    )

  }
}



