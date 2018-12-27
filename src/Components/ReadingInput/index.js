import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
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
});


const readingTypes = [
    {
      value: 'Fever',
      label: 'Temp [ºC]',
    },
    {
      value: 'Weight',
      label: 'Peso [Kg]',
    },
];
  

class MedicineInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId       : this.props.patID,
            patientsFever   : [],
            patientsWeight  : [],
            readingType     : '',
            readingDate     : '',
            readingValue    : null,
        };

        this.onNewReading   = this.onNewReading.bind(this);

    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {

           // console.log('res = ', res)

        
            this.setState({ 
                patientsFever   : res.patientsFever,
                patientsWeight  : res.patientsWeight,
            });

           // console.log('this.stateFever / weight = ', this.state.patientsFever, ' / ', this.state.patientsWeight)

        })
        .catch(function (error) {    
        console.log(error);
        })    
    }

    onChangeState(field, value){
        let readingInfo = this.state;
        readingInfo[field] = value;
        this.setState(readingInfo)
    };

    onNewReading(e){
        e.preventDefault();       

        let rCode = Calculations.generateCode()

        let newReading = {
            patientId       : this.props.patID,
            readingCode     : rCode,
            readingType     : this.state.readingType,
            readingDate     : this.state.readingDate,
            readingValue    : this.state.readingValue,
        };

        if (newReading.readingType === 'Fever'){

            let transFever = [...this.state.patientsFever];
            transFever.push(newReading);
            
            this.setState({
                patientsFever : transFever,
            })

            DataService.addNewFever(this.props.patID, transFever)
            .then((result) => {
    
                //console.log('new Fever succesfully registered');
                this.props.propsFn.push(`/patient/${this.props.patID}`)
    
            })
            .catch(function (error) {    
                console.log(error);
            })
            this.props.propsFn.push(`/patient/${this.state.patientId}`)

        } else {

            let transWeight = [...this.state.patientsWeight];
            transWeight.push(newReading);


            this.setState({
                patientsWeight : transWeight,
            })

            DataService.addNewWeight(this.props.patID, transWeight)
            .then((result) => {
    
                console.log('new Weight succesfully registered');
                this.props.propsFn.push(`/patient/${this.props.patID}`)
    
            })
            .catch(function (error) {    
                console.log(error);
            })
    
        }
        
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>Registrar una medición</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewReading}>
            
                <div id="input-area">

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Tipo de registro"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.readingType}
                            onChange={(e)=>{this.onChangeState('readingType', e.target.value)}}

                        >
                            {readingTypes.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            id="date"
                            label="Fecha"
                            type="date"
                            defaultValue="dd/mm/yyyy"
                            className={classes.textField}
                            value={this.state.readingDate}
                            onChange={(e)=>{this.onChangeState('readingDate', e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Valor"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.readingValue}
                            onChange={(e)=>{this.onChangeState('readingValue', e.target.value)}}
                        />
                    </div>
 
                </div>

                <div className="button-area">
                    
                        <Button variant="contained" color="primary" className={classes.button} type="submit">
                            Guardar
                        </Button>
                    
                </div>
            </form>
        </div>
    );
  }
}

MedicineInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicineInput);