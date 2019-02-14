import React from 'react';

// SERVICE API
import DataService from '../services/DataService';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';


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

class SingleEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            eventId             : this.props.eventID,
            patientId           : this.props.patID,
            eventDate           : '',
            startTime           : '',
            duration            : '',
            minSaturation       : '',
            fever               : '',
            clinicObservation   : '',
            action              : '',
            detonation          : '',
            patientEvents       : [],

        };

        // this.onNewReading             = this.onNewReading.bind(this);

    }

    componentDidMount(){
        console.log('this.props.eventID', this.props.eventID)

        DataService.getEventInfo(this.state.eventId)
        .then(res => {
        
            this.setState({ 
                eventDate           : res.date,
                startTime           : res.startTime,
                duration            : res.duration,
                minSaturation       : res.minSaturation,
                fever               : res.fever,
                clinicObservation   : res.clinicObservation,
                action              : res.action,
                detonation          : res.detonation,
            });

            console.log('this.state.date', this.state.date )
        })
        .catch(function (error) {    
        console.log(error);
        })    
    }

    onChangeState(field, value){
        let aptInfo = this.state;
        aptInfo[field] = value;
        this.setState(aptInfo)
    };

    onUpdateEvent(e){
        e.preventDefault();       

        let newReading = {
            userId          : this.state.userId,
            patientId       : this.props.patID,
            patientName     : this.state.patientName,
            patientSurname  : this.state.patientSurname,
            readingDate     : this.state.readingDate,
            readingValue    : this.state.readingValue,
        };

        DataService.updateEventInfo(this.state.readingType, newReading)
        .then((result) => {

            newReading.readingId = result.id;



        })
        .catch(function (error) {    
            console.log(error);
        })



        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
    };

    render() {
        const { classes } = this.props;
    
        return (
    
            <div className="sev-container">

                <form  id="sev-form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onUpdateEvent}>
                
                    <div className="sev-form-title">
                        <h4>Información del evento</h4>
                    </div>

                    <div id="sev-input-area">
    
                        <label className="sev-label">
                            <div className="input-div">
                                <p>Fecha del evento</p>
                            </div>
                            <input id="sev-input"
                                size="15"
                                type="value"
                                value={this.state.date}
                                onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                            /> 
                        </label>

                        <label className="sev-label-short">
                            <div className="input-div">
                                <p>Comienzo (hr:min)</p>
                            </div>
                            <input id="sev-input"
                                size="150"
                                type="value"
                                value={this.state.startTime}
                                onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                            /> 
                        </label>

                        <label className="sev-label-short">
                            <div className="input-div">
                                <p>Duración (mins)</p>
                            </div>
                            <input id="sev-input"
                                size="150"
                                type="value"
                                value={this.state.duration}
                                onChange={(e)=>{this.onChangeState('duration', e.target.value)}}
                            /> 
                        </label>
                        
                        <label className="sev-label-short">
                            <div className="input-div">
                                <p>Saturación min (%)</p>
                            </div>
                            <input id="sev-input"
                                size="150"
                                type="value"
                                value={this.state.minSaturation}
                                onChange={(e)=>{this.onChangeState('minSaturation', e.target.value)}}
                            /> 
                        </label>

                        <label className="sev-label-short">
                            <div className="input-div">
                                <p>Fiebre (ºC)</p>
                            </div>
                            <input id="sev-input"
                                size="150"
                                type="value"
                                value={this.state.fever}
                                onChange={(e)=>{this.onChangeState('fever', e.target.value)}}
                            /> 
                        </label>

                        <label className="sev-label-text">
                            <div className="input-div">
                                <p>Detonante:</p>
                            </div>
                            <textarea id="sev-input-text"
                                size="150"
                                type="value"
                                value={this.state.detonation}
                                onChange={(e)=>{this.onChangeState('detonation', e.target.value)}}
                            /> 
                        </label>

                        <label className="sev-label-text">
                            <div className="input-div">
                                <p>Observación Clínica:</p>
                            </div>
                            <textarea id="sev-input-text"
                                size="150"
                                type="value"

                                value={this.state.clinicObservation}
                                onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}
                            /> 
                        </label>
    
                        <label className="sev-label-text">
                            <div className="input-div">
                                <p>Acciones:</p>
                            </div>
                            <textarea id="sev-input-text"
                                size="150"
                                type="value"
                                value={this.state.action}
                                onChange={(e)=>{this.onChangeState('action', e.target.value)}}
                            /> 
                        </label>

    
                        <div id="input-field">
                           <h2>IMAGES AND VIDEO AREA</h2>
                        </div>
    
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

SingleEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleEvent);