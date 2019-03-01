import React from 'react';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// ACCESOIRES
import SubmitButton from '../Accessories/SubmitButton';


import './index.css'; 

export default class PatientOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            adminId         : this.props.userID,
            patientId       : this.props.patID,
            patientName     : '',
            patientSurname  : '',
            birthDate       : '',
            birthWeight     : '',
            pregIssues      : '',
            birthIssues     : '',

        };
        this.onEditPatient = this.onEditPatient.bind(this)
    }

    componentDidMount(){ 
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {

            let admin   = res.adminId;
            let name    = res.patientName;
            let surname = res.patientSurname;
            let born    = res.birthDate;
            let weight  = res.birthWeight;
            let bIssues = res.birthIssues;
            let pIssues = res.pregIssues;
            // let events  = res.patientsEvents; 
            // let med     = res.patientsMedicines;
            // let weight  = res.patientsWeights;

            // let sortedWeights = Calculations.sortByDateAsc(weight);
            // let long          = sortedWeights.length;
            // let lastWeight    = sortedWeights[long-1].weight;

            this.setState({
                adminId        : admin,
                patientName    : name,
                patientSurname : surname,
                birthDate      : born,
                birthWeight    : weight,
                pregIssues     : bIssues,
                birthIssues    : pIssues,
                // patientsEvents      : events,
                // patientsMedicines   : med,
                // patientsWeights     : weight,
                // cWeight             : lastWeight,
            });

        })

    }

    // componentDidUpdate(prevProps){
    //     if (this.props.userID !== prevProps.userID) {
    //         this.setState({
    //             adminId : prevProps.userID})
    //     }
    // }

    onChangeState(field, value){
        let patientInfo = this.state;
        patientInfo[field] = value;
        this.setState(patientInfo)
    };

    onEditPatient(e){
        e.preventDefault(); 
        console.log('SUBMIT WORKS FINE', this.state.patientName);

        let editedPatient = {
            adminId   : this.state.adminId,
            name      : this.state.patientName, 
            surname   : this.state.patientSurname, 
            born      : moment(this.state.birthDate).format('DD-MMM-YYYY'),
            weight    : this.state.birthWeight,
            pIssues   : this.state.pregIssues,
            bIssues   : this.state.birthIssues,
            // events    : this.state.patientsEvents,
            // weights   : this.state.patientsWeights,
            // medicines : this.state.patientsMedicines,
        };
       
        let patID = this.state.patientId;
          
        DataService.editPatient(patID, editedPatient);
        // .then((result)=>{
           
        //     let editedPatient = {
        //         patientId           : result.id,
        //         patientName         : this.state.patientName,
        //         patientSurname      : this.state.patientSurname,
        //         admin               : true,
        //         moderator           : true,
        //     }
        //     console.log('userPatients luego de crear newPatient', this.state.userPatients);
        //     let transPatient = this.state.userPatients;

        //     if(transPatient.length === 0){
        //         transPatient[0] = newPatient;
        //     } else {
        //         transPatient.push(newPatient);
        //     }
            
        // })
        // .catch(function (error) {    
        //     console.log(error);
        // })

        this.props.propsFn.push(`/patient/${this.state.patientId}`);
    };

  
    render() {
        console.log(this.props.userID)
        return (
    
            <div className="pat-in-form-container">
    
                <form  id="pat-in-form-format" onSubmit={this.onEditPatient}>
                
                    <div className="pat-in-form-title">
                        <h2>Modificar datos del paciente</h2>
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
                                    value={this.state.patientSurname}
                                    onChange={(e)=>{this.onChangeState('patientSurname', e.target.value)}}
                                /> 
                            </label>
    
                            <label className="pat-in-label-info">
                                <p>Fecha de nacimiento</p>
                                <input className="pat-in-input-date"
                                    type="text"
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
