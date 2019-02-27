import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import CustomDropZone from '../CustomDropZone';
import DropzoneWithPreview from '../CustomDropWithPrev';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// CSS
import './index.css'; 



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(0, 144, 248);',
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});


class FirstEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            patientName         : '',
            date                : '',
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
            patientsEvents  : pat.patientsEvents,     
            patientName     : pat.patientName,   
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
            date                : this.state.date,
            startTime           : this.state.startTime,
            duration            : this.state.duration,
            minSaturation       : this.state.minSaturation,
            fever               : this.state.fever,
            clinicObservation   : this.state.clinicObservation,
            action              : this.state.action,
            detonation          : this.state.detonation,
        };

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
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>Por favor ingresa la información que dispongas del primer evento de {this.state.patientName}</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewEvent}>
            
                <div id="fev-input-area">

                    <div className="input-row">
                    
                        <label>
                            Fecha
                            <input id="input-date"
                                size="150"
                                type="date"
                                value={this.state.date}
                                onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            Comienzo [Hr:mm]
                            <input className="fev-input" 
                                size="150" 
                                value={this.state.startTime}
                                onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            Duración [min]
                            <input className="fev-input" size="150" type="text" name="Duración"
                                value={this.state.duration}
                                onChange={(e)=>{this.onChangeState('duration', e.target.value)}}
                            /> 
                        </label>

                        <label>
                            Saturación mínima [%]
                            <input className="fev-input" size="150" type="text" name="Saturaciín Mínima"
                                value={this.state.minSaturation}
                                onChange={(e)=>{this.onChangeState('minSaturation', e.target.value)}}
                            /> 
                        </label>


                        <label>
                            Fiebre [ºC]
                            <input className="fev-input" size="150"  name="Fiebre"
                                value={this.state.fever}
                                onChange={(e)=>{this.onChangeState('fever', e.target.value)}}
                            /> 
                        </label>

                    </div>

                    <div className="textarea-row">

                        <label className="text-area-box">
                            Detonante
                            <textarea className="fev-input-area" 
                                name="Detonante"
                                value={this.state.detonation}
                                onChange={(e)=>{this.onChangeState('detonation', e.target.value)}}
                            /> 
                        </label>
                    
                        <label className="text-area-box">
                            Observación Clínica
                            <textarea  
                                name="Observación"
                                value={this.state.clinicObservation}
                                onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}
                            /> 
                        </label>

                        <label className="text-area-box">
                            Acción
                            <textarea
                                name="Acción"
                                value={this.state.action}
                                onChange={(e)=>{this.onChangeState('action', e.target.value)}}
                            /> 
                        </label>


                    </div>

                    <div className="docs-row">

                        <CustomDropZone 
                            onFileUpload={(fileUrl)=>{this.onChangeState('eventPics', fileUrl)}}
                            acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                            uploadFolder={`patientID:${this.state.patientId}/${this.state.eventCode}`}
                            name="Imágenes / Videos"
                            text="Arrastra tus archivos hasta aquí"
                        />  

                    </div>
                </div>

                <div className="fev-button-area">
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                        Enviar
                    </Button>
                    
                </div>
           
            </form>
        </div>
    );
  }
}

FirstEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FirstEvent);