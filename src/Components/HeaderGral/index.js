import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// SERVICE API
import DataService from '../services/DataService';


import '../HeaderGral/index.css';

class HeaderGral extends Component {
   constructor(props){
    super(props);

    this.state = {
        userId          : '',
        patientId       : this.props.patID,
        patientName     : '',
        patientSurname  : '',
    }

    this.signOut = this.signOut.bind(this);

   }

   componentDidMount(){
    
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
    
    this.setState({ 
        userId          : res.adminId,
        patientName     : res.patientName,
        patientSurname  : res.patientSurname,        
    });

    })
    .catch(function (error) {    
    console.log(error);
    })    
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

            </div>

            <div className="header-mid">

                <div className="nav-block">
                    <Link to={`/medicine_overview/${this.state.patientId}`}><p className="header-texts">Medicación</p></Link>
                </div>

                <div className="nav-block">
                    <Link to={`/events-overview/${this.state.patientId}`}><p className="header-texts">Eventos</p></Link>
                </div>

                <div className="nav-block">
                    <Link to={`/patient_new_reading/${this.state.patientId}`}><p className="header-texts">Peso</p></Link>
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
export default HeaderGral;
