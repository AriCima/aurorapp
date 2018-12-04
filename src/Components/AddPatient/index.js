import React from 'react';

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



class NewPatient extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            adminId         : this.props.userID,
            userPatients    : [],
            PatientName     : '',
            bornDate        : '',
        };
        this.onNewPatient             = this.onNewPatient.bind(this);
    }

    componentDidMount(){ // Obtengo todos los Patients del user paera agregarle el nuevo
        DataService.getUserInfo(this.state.adminId)
        .then(res => {
            let patients = res.userPatients;
            this.state.userPatients = patients;
        })
    }

    onChangeState(field, value){
        let patientInfo = this.state;
        patientInfo[field] = value;
        this.setState(patientInfo)
    };



    onNewPatient(e){
        e.preventDefault();       

       

        let newState = {
            adminId         : this.state.adminId,
            patientName     : this.state.patientName, 
            patientSurnName : this.state.patientSurnName, 
            bornDate        : this.state.bornDate,
        };
       
        console.log('new state = ', newState)
        DataService.createPatient(newState)
        .then((result)=>{
           
            let NewPatient = {
                patientId       : result.id,
                patientName     : this.state.patientName,
                patientSurName  : this.state.patientSurName,
                admin           : true,
                moderator       : true,
            }

            let transPatient = this.state.userPatients
            transPatient.push(NewPatient);

            this.setState({
                userPatients : transPatient,
            })
        
            DataService.addPatientToUser(this.state.adminId, this.state.userPatients)  
            this.props.NewPatient(result.id);
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
                            onChange={(e)=>{this.onChangeState('PatientName', e.target.value)}}
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
                            onChange={(e)=>{this.onChangeState('PatientSurName', e.target.value)}}
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

NewPatient.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewPatient);