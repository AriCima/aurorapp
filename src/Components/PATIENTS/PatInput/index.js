import React from 'react';

// // Firebase services
// import firestore from '../../../firebase';
// import firebase from 'firebase/app';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
// import Calculations from '../../services/Calculations';

//ACCESORIES
import SubmitButton from '../../Accessories/SubmitButton';


import './index.css'; 

export default class PatientInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            // adminId             : this.props.userID,
            patientId           : '',
            patientName         : '',
            patientSurname      : '',
            birthDate           : '',
            birthWeight         : '',
        };

        this.onNewPatient = this.onNewPatient.bind(this);
    }

    onChangeState(field, value){
        let patientInfo = this.state;
        patientInfo[field] = value;
        this.setState(patientInfo)
    };

    onNewPatient(e){
        e.preventDefault(); 
        let userID = this.props.userID;

        let noCommas    = this.state.birthWeight.replace(",", ".");


        let newPatientInfo = {
            // EACH PATIENT HAS AN ADMIN WHICH BY DEFAULT IS THE USER THAT CREATES THE PATIENT PROFILE
            adminId                : userID,
            patientName            : this.state.patientName, 
            patientSurname         : this.state.patientSurname, 
            birthDate              : moment(this.state.birthDate).format('DD-MMM-YYYY'),
            birthWeight            : this.state.birthWeight,
            ownEventTypes          : [],
            ownDetonations         : [],
            ownMeds                : [],
        };
       
         
        DataService.newPatientALT(userID, newPatientInfo)
        .then((result)=>{
            let patID = result.id;
        
            this.setState({
                patientId : patID,
            })
           
            let newWeight = {
                patientId   : this.state.patientId,
                date        : this.state.birthDate,
                weight      : noCommas,
            };

            DataService.newWeightALT(userID, patID, newWeight)
            .then((result) => {
                console.log('Nuevo Peso registrado con el código: ', result.id);
            })
            .catch(function (error) {    
                console.log(error);
            });


            // DataService.addWeight(newWeight)
            // .then((result) => {
            //     console.log('Nuevo Peso registrado con el código: ', result.id);
            // })
            // .catch(function (error) {    
            //     console.log(error);
            // });


            
            //let newOwnType = [{patientId: this.state.patientId, ownTypes: []}]
            
            // DataService.addEventType(newOwnType)
            // .then((result) => {
            //     // console.log('el result.id del add Event ', result.id)
                
            // })
            // .catch(function (error) {    
            //     console.log(error);
            // })
            

            // let newOwnDetonations = {patientId: this.state.patientId, ownDetonations: []}

            // DataService.addDetonation(newOwnDetonations)
            // .then((result) => {
            //     // console.log('el result.id del add Deto ', result.id)

            // })
            // .catch(function (error) {    
            //     console.log(error);
            // })

            this.props.propsFn.push(`/patient-overview/${this.state.patientId}`);
        })
        .catch(function (error) {    
            console.log(error);
        })
         
        // DataService.newPatient(newState)
        // .then((result)=>{
        //     let patID = result.id;
        
        //     this.setState({
        //         patientId : patID,
        //     })
           
        //     let newWeight = {
        //         patientId   : this.state.patientId,
        //         date        : this.state.birthDate,
        //         weight      : noCommas,
        //     };

        //     DataService.addWeight(newWeight)
        //     .then((result) => {
        //         console.log('Nuevo Peso registrado con el código: ', result.id);
        //     })
        //     .catch(function (error) {    
        //         console.log(error);
        //     });


            
        //     //let newOwnType = [{patientId: this.state.patientId, ownTypes: []}]
            
        //     // DataService.addEventType(newOwnType)
        //     // .then((result) => {
        //     //     // console.log('el result.id del add Event ', result.id)
                
        //     // })
        //     // .catch(function (error) {    
        //     //     console.log(error);
        //     // })
            

        //     // let newOwnDetonations = {patientId: this.state.patientId, ownDetonations: []}

        //     // DataService.addDetonation(newOwnDetonations)
        //     // .then((result) => {
        //     //     // console.log('el result.id del add Deto ', result.id)

        //     // })
        //     // .catch(function (error) {    
        //     //     console.log(error);
        //     // })

        //     this.props.propsFn.push(`/patient/${this.state.patientId}`);
        // })
        // .catch(function (error) {    
        //     console.log(error);
        // })


    };

  
   

    render() {

        return (

            <div className="pat-in-form-container">

                <form  id="pat-in-form-format" onSubmit={this.onNewPatient}>
                
                    <div className="pat-in-form-title">
                        <h2>Datos del paciente</h2>
                    </div>

                    <div id="pat-in-input-area">

                        <div className="pat-input-row">
                            
                            <label className="pat-in-label-info">
                                <p>Nombre</p>
                                <input className="pat-in-input-info"
                                    size="1"
                                    type="text"
                                    value={this.state.patientName}
                                    onChange={(e)=>{this.onChangeState('patientName', e.target.value)}}
                                /> 
                            </label>

                            <label className="pat-in-label-info">
                                <p>Apellido</p>
                                <input className="pat-in-input-info"
                                    size="1"
                                    type="text"
                                    value={this.state.patientSurnName}
                                    onChange={(e)=>{this.onChangeState('patientSurname', e.target.value)}}
                                /> 
                            </label>

                            <label className="pat-in-label-info">
                                <p>Fecha de nacimiento</p>
                                <input className="pat-in-input-date"
                                    type="date"
                                    value={this.state.birthDate}
                                    onChange={(e)=>{this.onChangeState('birthDate', e.target.value)}}
                                /> 
                            </label>

                            <label className="pat-in-label-short">
                                <p>Peso al nacer [kg]</p>
                                <input className="input-date"
                                    size="3"
                                    type="text"
                                    value={this.state.birthWeight}
                                    onChange={(e)=>{this.onChangeState('birthWeight', e.target.value)}}
                                /> 
                            </label>
                        
                        </div>


                    </div>

                    <div className="pat-in-button-area">
                    <SubmitButton text={'GUARDAR'}/>
                    </div>
                </form>
            </div>
        );
    }
}
