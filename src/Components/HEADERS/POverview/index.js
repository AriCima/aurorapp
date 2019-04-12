import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// AUX COMPONENTS
import moment from 'moment';

// COMPONENTS
import InfoContainer from './InfoContainer';

import './index.css';


export default class POverview extends Component {
   constructor(props){
    super(props);

    this.state = {
        userId          : '',
        patientId       : this.props.patID,
        patientName     : '',
        patientSurname  : '',
        currentWeight   : '',
        age             : '',
        visible         : false,
    }

    this.signOut = this.signOut.bind(this);
   }

   componentDidMount(){
    
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
    
        let birthD = res.birthDate;
        let age = Calculations.getAge(birthD);
          
        this.setState({ 
            userId          : res.adminId,
            patientName     : res.patientName,
            patientSurname  : res.patientSurname,  
            age             : age,      
        });

    })
    .catch(function (error) {    
    console.log(error);
    })   
    
    DataService.getPatientsWeights(this.props.patID)
    .then(weights => {
      let wSorted = Calculations.sortByDateAsc(weights);
      // console.log('wSorted', wSorted);
      let wL = wSorted.length;

      let cWeight = wSorted[wL - 1].weight;

      this.setState({
        currentWeight: cWeight
      });
    })
    .catch(function(error) {
      console.log(error);
    });

   }
   
    signOut(){   //Esta función informa a FireBase sobre el logout y FB automáticamente ejecuta el onAuthStateChange del App
        firebase.auth().signOut()
            .then(() => {
                alert('See you later !') // Sign-out successful.
            })
            .catch(() => {
                alert("Ups! Seems you'll have to stay longer")// An error happened.
        });
    }

    render() {
       
        return (

            <div className="header">

            <div className="header-left">

                <div className="nav-block">
                    <Link to={`/home/${this.state.userId}`}><p className="header-texts">Inicio</p></Link>
                </div>

                <div className="nav-block">
                    
                        <Link to={`/patient/${this.state.patientId}`}><p className="header-texts">{this.state.patientName}</p></Link>
                    
                </div>

                <div id="pat-info-block-header">
                    
                    <InfoContainer patID={this.state.patientId} age={this.state.age}/>
                    
                </div>
            </div>

            <div className="header-mid">

                <div className="nav-block">
                    <Link to={`/medicine_overview/${this.state.patientId}`}><p className="header-texts">Medicación</p></Link>
                </div>

                <div className="nav-block">
                    <Link to={`/events-overview/${this.state.patientId}`}><p className="header-texts">Eventos</p></Link>
                </div>

                <div className="nav-block">
                    <Link to={`/weight_overview/${this.state.patientId}`}><p className="header-texts">Peso</p></Link>
                </div>

            </div>

            <div className="header-right">
                <div className="nav-block">
                    {<span onClick={this.signOut}><Link to="/login"><p className="header-texts">Sign-out</p></Link></span>}
                </div>
            </div>

        </div>
                            

        );
    }
}

