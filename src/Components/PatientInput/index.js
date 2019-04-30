import React from 'react';

// Firebase services
import firestore from '../../firebase';
import firebase from 'firebase/app';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

//ACCESORIES
import SubmitButton from '../Accessories/SubmitButton';


import './index.css'; 

export default class PatientInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            adminId             : this.props.userID,
            patientId           : '',
            patientName         : '',
            patientSurname      : '',
            birthDate           : '',
            birthWeight         : '',
            pregIssues          : '',
            birthIssues         : '',
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

        let noCommas    = this.state.birthWeight.replace(",", ".");

        let newState = {
            adminId                : this.state.adminId,
            patientName            : this.state.patientName, 
            patientSurname         : this.state.patientSurname, 
            birthDate              : moment(this.state.birthDate).format('DD-MMM-YYYY'),
            pregIssues             : this.state.pregIssues,
            birthIssues            : this.state.birthIssues,
            birthWeight            : this.state.birthWeight,
            ownEventTypes          : [],
            ownDetonations         : [],
            ownMeds                : [],
        };
       
         
        DataService.newPatient(newState)
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

            DataService.addWeight(newWeight)
            .then((result) => {
                console.log('Nuevo Peso registrado con el código: ', result.id);
            })
            .catch(function (error) {    
                console.log(error);
            });


            
            let newOwnType = [{patientId: this.state.patientId, ownTypes: []}]
            
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

            this.props.propsFn.push(`/patient/${this.state.patientId}`);
        })
        .catch(function (error) {    
            console.log(error);
        })


    };

  
   

    render() {

        return (

            <div className="pat-in-form-container">

                <form  id="pat-in-form-format" onSubmit={this.onNewPatient}>
                
                    <div className="pat-in-form-title">
                        <h2>Datos del paciente</h2>
                    </div>

                    <div id="pat-in-input-area">

                        <div className="nev-input-row">
                            
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


                        <div className="pat-in-textarea-row">

                            <label className="pat-in-textarea-label">
                                <p>Complicaciones durante el embarazo (si las hubo)</p>
                                <textarea className="pat-in-textarea"
                                    name="Acción"
                                    value={this.state.pregIssues}
                                    onChange={(e)=>{this.onChangeState('pregIssues', e.target.value)}}
                                /> 
                            </label>


                            <label className="pat-in-textarea-label">
                                <p>Complicaciones en el parto (si las hubo)</p>
                                <textarea className="pat-in-textarea"
                                    name="Acción"
                                    value={this.state.birthIssues}
                                    onChange={(e)=>{this.onChangeState('birthIssues', e.target.value)}}
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
