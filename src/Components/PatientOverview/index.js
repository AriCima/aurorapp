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
            adminId             : '',
            patientId           : this.props.patID,
            patientName         : '',
            patientSurname      : '',
            bornDate            : '',
            patientsEvents      : [], 
            patientsMedicines   : [],
            patientsWeights     : [], 
            cWeight             : '',
        };

        this.onEditPatient = this.onEditPatient.bind(this);
    }

    componentDidMount(){ 
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
            let admin   = res.adminId;
            let name    = res.patientName;
            let surname = res.patientSurname;
            let born    = res.bornDate;
            let events  = res.patientsEvents; 
            let med     = res.patientsMedicines;
            let weight  = res.patientsWeights;

            let sortedWeights = Calculations.sortByDateAsc(weight);
            let long          = sortedWeights.length;
            let lastWeight    = sortedWeights[long-1].weight;

            this.setState({
                adminId             : admin,
                patientName         : name,
                patientSurname      : surname,
                bornDate            : born,
                patientsEvents      : events,
                patientsMedicines   : med,
                patientsWeights     : weight,
                cWeight             : lastWeight,
            });
        })
    }

    onChangeState(field, value){
        let patientInfo = this.state;
        patientInfo[field] = value;
        this.setState(patientInfo)
    };

    onEditPatient(e){
        e.preventDefault(); 
        console.log('SUBMIT WORKS FINE');
        // let today = moment(new Date()).format('DD-MMM-YYYY');
        // let rCode = Calculations.generateCode();

        let editedPatient = {
            adminId   : this.state.adminId,
            name      : this.state.patientName, 
            surname   : this.state.patientSurname, 
            born      : moment(this.state.bornDate).format('DD-MMM-YYYY'),
            events    : this.state.patientsEvents,
            weights   : this.state.patientsWeights,
            medicines : this.state.patientsMedicines,
        };
       
        console.log('editedPatient = ', editedPatient)

        let patID = this.state.patientId;

        console.log('patID enviado', patID)
        
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

    return (

        <div className="form-container">


            <form  id="form-format" noValidate autoComplete="off" onSubmit={this.onEditPatient}>
            

                <div className="form-title">
                    <h1>Información de <span>{this.state.patientName} {this.state.patientSurname}</span></h1>
                </div>


                <div id="input-area">

                    <div className="med-input-row">

                        <label>
                            <p>Nombre</p>
                            <input id="input-date"
                                size="150"
                                type="text"
                                value={this.state.patientName}
                                onChange={(e)=>{this.onChangeState('patientName', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            <p>Apellido</p>
                            <input id="input-date"
                                size="150"
                                type="text"
                                value={this.state.patientSurname}
                                onChange={(e)=>{this.onChangeState('patientSurname', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            <p>Fecha de nacimiento</p>
                            <input id="input-date"
                                size="150"
                                type="text"
                                value={this.state.bornDate}
                                onChange={(e)=>{this.onChangeState('bornDate', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            <p>Peso actual</p>
                            <input id="input-date"
                                size="150"
                                type="text"
                                value={this.state.cWeight}
                                // onChange={(e)=>{this.onChangeState('cWeight', e.target.value)}}
                            /> 
                        </label>

                    </div>

                    <div className="button-area">

                        <SubmitButton 
                            type="submit" 
                            fn={this.onEditPatient} 
                            text={'GUARDAR'}>
                        </SubmitButton>
                        
                    </div>
                </div>

            </form>
        </div>
    );
  }
}

