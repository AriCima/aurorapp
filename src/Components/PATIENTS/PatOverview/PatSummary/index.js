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

export default class PatSummary extends React.Component {
 

  


  render() {
    const { patInfo , patID, userID, name, surname, age, cWeight } = this.props;

    return (


      <div className="patInfo-area">

        <div className="patInfo-upper">

          <div className="patInfo-title">
            <h2>Info del paciente</h2>
          </div>

          <div className="patInfo-button">
            <div>
              <Link to={`/patient-input/${patID}`}>
                <AddButtonCool text={"Modificar"} userID={userID} patID={patID}/>
              </Link>
            </div>
          </div>

        </div>

        <div className="pat-info-wrapper">

          <div className="patInfo-box">
            <div className="patInfo-var">
              <p id="p-patInfo">Nombre</p>
            </div>
            <div className="patInfo-val">
              <p id="p-patInfo">{name} {surname}</p>
            </div>
          </div>

          <div className="patInfo-box">
              <div className="patInfo-var">
                <p id="p-patInfo">Edad</p>
              </div>
              <div className="patInfo-val">
                <p id="p-patInfo">{age}</p>
              </div>
          </div>
        

          <div className="patInfo-box">

            <div className="patInfo-var">
              <p id="p-patInfo">Peso</p>
            </div>
            <div className="patInfo-val">
              <p id="p-patInfo">{cWeight} </p>
            </div>
            
          </div>

        </div>

      </div>

    );
  };
};

