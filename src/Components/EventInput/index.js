import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';
import CustomDropZone from '../CustomDropZone';
import DropzoneWithPreview from '../CustomDropWithPrev';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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


class EventInput extends React.Component {
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
            eventDate           : this.state.eventDate,
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
            console.log('NewEvent = ', newEvent);

            let eventsArray = this.state.patientsEvents;

            console.log('El estado dentro del addNewEvent = ', this.state.patientsEvents);
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
                <h4>ADD NEW Event</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewEvent}>
            
                <div id="input-area">

                    <div id="input-fields-select">
                        <TextField
                            id="date"
                            label="Fecha"
                            type="date"
                            defaultValue="dd/mm/yyyy"
                            className={classes.textField}
                            value={this.state.eventDate}
                            onChange={(e)=>{this.onChangeState('eventDate', e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Comienzo"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.startTime}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Hr:min</InputAdornment>,
                              }}
                            onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Duración"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.duration}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Mins</InputAdornment>,
                              }}
                            onChange={(e)=>{this.onChangeState('duration', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Saturación mínima"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.minSaturation}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> % </InputAdornment>,
                              }}
                            onChange={(e)=>{this.onChangeState('minSaturation', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Fiebre"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.fever}
                            InputProps={{
                                startAdornment: <InputAdornment position="start"> ºC</InputAdornment>,
                              }}
                            onChange={(e)=>{this.onChangeState('fever', e.target.value)}}

                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="standard-multiline-flexible"
                            label="Observación clínica"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.clinicObservation}
                            onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="standard-multiline-flexible"
                            label="Acción"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.action}
                            onChange={(e)=>{this.onChangeState('action', e.target.value)}}

                        />
                    </div>
                    <div id="input-fields">
                        <TextField
                            id="standard-multiline-flexible"
                            label="Detonante"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.detonation}
                            //onChange={this.onChangeEventRooms}
                            onChange={(e)=>{this.onChangeState('detonation', e.target.value)}}

                        />
                    </div>

                    <div id="input-field">
                        <CustomDropZone 
                            onFileUpload={(fileUrl)=>{this.onChangeState('eventPics', fileUrl)}}
                            acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                            uploadFolder={`patientID:${this.state.patientId}/${this.state.eventCode}`}
                            name="Imágenes / Videos"
                            text="Arrastra tus archivos hasta aquí"
                        />  
                    </div>

                    {/* <div id="input-field">
                        <DropzoneWithPreview 
                            onFileUpload={(fileUrl)=>{this.onChangeState('eventPics', fileUrl)}}
                            acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                            uploadFolder={`events-files/${this.state.patientId}/${this.state.eventCode}`}
                            name="Img / Vid"
                            text="Arrastra tus archivos hasta aquí"
                        />  
                    </div> */}
                   
  
                </div>

                <div className="button-area">
                    
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Enviar
                        </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

EventInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventInput);