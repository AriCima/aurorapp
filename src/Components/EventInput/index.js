import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import CustomDropZone from '../CustomDropZone';

//ACCESORIES
import SubmitButton from '../Accessories/SubmitButton';

// CSS
import './index.css'; 



export default class EventInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            eventDate           : '',
            startTime           : '',
            duration            : '',
            minSaturation       : '',
            fever               : '',
            clinicObservation   : '',
            action              : '',
            detonation          : '',
            patientsEvents      : [],
        };

        this.onNewEvent             = this.onNewEvent.bind(this);

        this.state.eventCode = Calculations.generateCode();
        //console.log('el code en el state = ', this.state.eventCode)

    }
    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
          const pat = res;
         // console.log("Res del patientInfo: ", res)
          this.setState({ 
            patientsEvents   : pat.patientsEvents,        
          });
        })
        .catch(function (error) {    
          console.log(error);
        })    
    }
   

    onChangeState(field, value){
        let eventInfo = this.state;
        eventInfo[field] = value;
        this.setState(eventInfo)
    };

    onNewEvent(e){
        e.preventDefault();       

        //console.log('El estado del events al lanzar onNewEvent = ', this.state.patientsEvents)
        

        let newEvent = {
            patientId           : this.props.patID,
            date                : this.state.eventDate,
            startTime           : this.state.startTime,
            duration            : this.state.duration,
            minSaturation       : this.state.minSaturation,
            fever               : this.state.fever,
            clinicObservation   : this.state.clinicObservation,
            action              : this.state.action,
            detonation          : this.state.detonation,
        }

        DataService.addNewEvent(newEvent)
        .then((result) => {

            newEvent.eventId = result.id;
            //console.log('NewEvent = ', newEvent);

            let eventsArray = this.state.patientsEvents;

           // console.log('El estado dentro del addNewEvent = ', this.state.patientsEvents);
            eventsArray.push(newEvent);

            this.setState({
                patientsEvents : eventsArray,
            })

            DataService.addNewEventToPatient(this.state.patientId, this.state.patientsEvents);
            this.props.propsFn.push(`/patient/${this.state.patientId}`)
        })
        .catch(function (error) {    
            console.log(error);
        })
    };

  
  render() {

    return (

        <div className="nev-form-container">

            <div className="nev-form-title">
                <h2>Nuevo Evento</h2>
            </div>

            <form  id="nev-form-format" onSubmit={this.onNewEvent}>
            
                <div id="nev-input-area">

                    <div className="nev-input-row">
                    
                        <label className="label-date">
                            <p>Fecha</p>
                            <input className="input-date"
                                size="150"
                                type="date"
                                value={this.state.date}
                                onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                            /> 
                        </label>

                        <label className="label-short">
                            <p>Comienzo [Hr:mm]</p>
                            <input className="input-short" type="text" name="Comienzo"
                                size="150" 
                                value={this.state.startTime}
                                onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                            /> 
                        </label>

                        <label className="label-short">
                            <p>Duración [min]</p>
                            <input className="input-short" type="text" name="Duración"
                                value={this.state.duration}
                                onChange={(e)=>{this.onChangeState('duration', e.target.value)}}
                            /> 
                        </label>

                        <label className="label-short">
                            <p>Saturación mínima [%]</p>
                            <input className="input-short" type="text" name="Saturaciín Mínima"
                                value={this.state.minSaturation}
                                onChange={(e)=>{this.onChangeState('minSaturation', e.target.value)}}
                            /> 
                        </label>


                        <label className="label-short">
                            <p>Fiebre [ºC]</p>
                            <input className="input-short" type="text" name="Fiebre"
                                value={this.state.fever}
                                onChange={(e)=>{this.onChangeState('fever', e.target.value)}}
                            /> 
                        </label>

                    </div>

                    <div className="nev-textarea-row">

                        <label className="nev-textarea-label">
                            <p>Detonante</p>
                            <textarea className="nev-textarea"
                                name="Detonante"
                                value={this.state.detonation}
                                onChange={(e)=>{this.onChangeState('detonation', e.target.value)}}
                            /> 
                        </label>
                    
                        <label className="nev-textarea-label">
                            <p>Observación Clínica</p>
                            <textarea className="nev-textarea"
                                name="Observación"
                                value={this.state.clinicObservation}
                                onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}
                            /> 
                        </label>
                    </div>
                    
                    <div className="nev-textarea-row">

                        <label className="nev-textarea-label">
                            <p>Acción</p>
                            <textarea className="nev-textarea"
                                name="Acción"
                                value={this.state.action}
                                onChange={(e)=>{this.onChangeState('action', e.target.value)}}
                            /> 
                        </label>

                        <div className="nev-docs-row">

                            <CustomDropZone 
                                onFileUpload={(fileUrl)=>{this.onChangeState('eventPics', fileUrl)}}
                                acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                                uploadFolder={`patientID:${this.state.patientId}/${this.state.eventCode}`}
                                name="Imágenes / Videos"
                                background="white"
                                text="Arrastra tus archivos hasta aquí"
                            />  

                            </div>
                    
                    
                    </div>

                </div>

                <div className="nev-button-area">
                   <SubmitButton text={'GUARDAR'}/>
                </div>
           
            </form>
        </div>
    );
  }
}

