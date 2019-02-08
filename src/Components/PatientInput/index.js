import React from 'react';

// AUX COMP
import moment from 'moment';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },

});



class PatientInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            adminId             : this.props.userID,
            userPatients        : [],
            patientName         : '',
            patientSurname      : '',
            bornDate            : '',
            cWeight             : '',
            patientsEvents      : [],
            patientsWeights     : [],
            patientsMedicines   : [],

        };
        this.onNewPatient             = this.onNewPatient.bind(this);
    }

    componentDidMount(){ // Obtengo todos los Patients del user para agregarle el nuevo
        DataService.getUserInfo(this.state.adminId)
        .then(res => {
            console.log('el res recibido = ', res)
            let patients = res.userPatients;
            this.setState({userPatients : patients});
        })
    }

    onChangeState(field, value){
        let patientInfo = this.state;
        patientInfo[field] = value;
        this.setState(patientInfo)
    };

    onNewPatient(e){
        e.preventDefault(); 
        
        let today = moment(new Date()).format('DD-MMM-YYYY');
        let rCode = Calculations.generateCode();
        let noCommas = this.state.cWeight.replace(",", ".");

        let newWeight = {
            readingCode     : rCode,
            date            : today,
            weight          : noCommas,
        };

        let transWeights = [];
        transWeights.push(newWeight);
        console.log('transWeights = ', transWeights)

        let newState = {
            adminId                : this.state.adminId,
            patientName            : this.state.patientName, 
            patientSurname         : this.state.patientSurname, 
            bornDate               : moment(this.state.bornDate).format('DD-MMM-YYYY'),
            patientsEvents         : this.state.patientsEvents,
            patientsWeights        : transWeights,
            patientsMedicines      : this.state.patientsMedicines,
        };
       
        console.log('new state = ', newState)
        DataService.newPatient(newState)
        //console.log('userPatients al crear newPatient', this.state.userPatients)
        .then((result)=>{
           
            let newPatient = {
                patientId           : result.id,
                patientName         : this.state.patientName,
                patientSurname      : this.state.patientSurname,
                admin               : true,
                moderator           : true,
            }
            console.log('userPatients luego de crear newPatient', this.state.userPatients);
            let transPatient = this.state.userPatients;

            if(transPatient.length === 0){
                transPatient[0] = newPatient;
            } else {
                transPatient.push(newPatient);
            }
            
        
            this.setState({
                userPatients : transPatient,
            })
            console.log('this.state.adminId, this.state.userPatients', this.state.adminId, ' / ', this.state.userPatients)
            DataService.addPatientToUser(this.state.adminId, this.state.userPatients)  
            this.props.propsFn.push(`/first-event/${newPatient.patientId}`);

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
                <h1>Muevo Paciente</h1>
            </div>



            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewPatient}>
            
                <div className="form-title">
                    <h2>Datos del paciente</h2>
                </div>

                <div id="input-area">

                    <div id="input-fields">
                        <TextField
                            className={classes.margin}
                            InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                            }}
                            InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            }}
                            label="Nombre"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            onChange={(e)=>{this.onChangeState('patientName', e.target.value)}}
                        />

                    </div>

                    <div id="input-fields">
                        <TextField
                            className={classes.margin}
                            InputLabelProps={{
                            classes: {
                                root: classes.cssLabel,
                                focused: classes.cssFocused,
                            },
                            }}
                            InputProps={{
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            },
                            }}
                            label="Apellido"
                            variant="outlined"
                            id="custom-css-outlined-input"
                            onChange={(e)=>{this.onChangeState('patientSurname', e.target.value)}}
                        />

                    </div>

                    <div id="input-fields-select">
                        <TextField
                            id="date"
                            label="Fecha de Nacimiento"
                            type="date"
                            defaultValue="dd/mm/yyyy"
                            className={classes.textField}
                            value={this.state.bornDate}
                            onChange={(e)=>{this.onChangeState('bornDate', e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div id="input-fields">
                        <input size="50" type="text" name="Peso"
                            label="Peso actual"
                            value={this.state.cWeight}
                            onChange={(e)=>{this.onChangeState('cWeight', e.target.value)}}
                        />  Kg
                    </div>
                
                </div>

                <div className="button-area">
                    <Button variant="contained" color="primary" className={classes.button} type="submit">
                        Create
                    </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

PatientInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientInput);