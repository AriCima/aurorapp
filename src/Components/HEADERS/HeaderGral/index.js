import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import * as firebase from 'firebase';

// SERVICE API
import DataService from '../../services/DataService';


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

//    componentDidMount(){
    
//     DataService.getPatientInfo(this.state.patientId)
//     .then(res => {
    
//     this.setState({ 
//         userId          : res.adminId,
//         patientName     : res.patientName,
//         patientSurname  : res.patientSurname,        
//     });

//     })
//     .catch(function (error) {    
//     console.log(error);
//     })    
//    }
   
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
        console.log('props en el Hgral = ', this.props);

        const patName = this.props.patInfo.patientName;
        const birth = this.props.patInfo.birthDate;

        console.log('name y nacimiento', patName, ' / ', birth)
        return (

            <div className="header">

            {patName ? 

                <div className="header-with-patient">

                    <div className="header-left">

                        <div className="nav-block">
                            <Link to={`/home/${this.state.userId}`}><p className="header-texts">Inicio</p></Link>
                        </div>

                        <div className="nav-block-patInfo">
                            <p className="header-texts">{patName}, edad:{birth}, peso: {this.state.patWeight}</p>
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
                            <Link to={`/statistics_overview/${this.state.patientId}`}><p className="header-texts">Estadísticas</p></Link>
                        </div>

                    </div>

                </div>
                :
                <div className="header-no-patient">
                    <div className="headerNoPat-mid">
                        <p>ELIGE EL PACIENTE </p>
                    </div>
                </div>
            }

            <div className="header-right">

                <div className="nav-block-right">
                    {<span onClick={this.signOut}><Link to="/login"><p className="header-texts">Sign-out</p></Link></span>}
                </div>

            </div>
            
             
            
             
        
            
        </div>
                            

        );
    }
}
export default HeaderGral;
