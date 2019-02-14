import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// SERVICE API
import DataService from '../services/DataService';


import './index.css';

class HeaderEventOver extends Component {
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
                    <Link to={`/home/${this.state.userId}`}><h2> Home</h2></Link>
                    </div>
                </div>

                <div className="header-mid">

                    <div className="nav-block">
                        {this.state.patientName && <Link to={`/patient/${this.state.patientId}`}><h2>{this.state.patientName}</h2></Link> }
                    </div>

                    
                </div>

                <div className="header-right">

                    <div className="nav-block">
                        {<span onClick={this.signOut}><Link to="/login">Sign-out</Link></span>}
                    </div>

                </div>

            </div>
                            

        );
    }
}
export default HeaderEventOver;
