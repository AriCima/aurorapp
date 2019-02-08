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
  

class WeightInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId       : this.props.patID,
            patientsWeights : [],
            weightDate      : '',
            weight          : null,
        };

        this.onNewReading   = this.onNewReading.bind(this);

    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
           console.log('res  = ', res);

            this.setState({ 
                patientsWeights  : res.patientsWeights,
                
            });

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

        let rCode = Calculations.generateCode();
        let noCommas = this.state.weight.replace(",", ".");

        console.log('weightDate ?', this.state.weightDate)

        let newWeight = {
            readingCode : rCode,
            date        : this.state.weightDate,
            weight      : noCommas,
        };

        console.log('newWeight / state.weights = ', newWeight, ' / ', this.state.patientsWeights)

        let transWeights = this.state.patientsWeights;
        transWeights.push(newWeight);


        this.setState({
          patientsWeights : transWeights,
        })

        DataService.addNewWeight(this.props.patID, transWeights)
        .then((result) => {

            console.log('new Weight succesfully registered');
            this.props.propsFn.push(`/patient/${this.props.patID}`)

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
                <h4>Registro del peso</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewReading}>
            
                <div id="input-area">


                    <label>
                        Fecha
                        <input id="input-date"
                            size="150"
                            type="date"
                            value={this.state.weightDate}
                            onChange={(e)=>{this.onChangeState('weightDate', e.target.value)}}
                        /> 
                    </label>
                    {/* <div id="input-fields-select">
                        <TextField
                            id="date"
                            label="Fecha"
                            type="date"
                            defaultValue="dd/mm/yyyy"
                            className={classes.textField}
                            value={this.state.weightDate }
                            onChange={(e)=>{this.onChangeState('weightDate ', e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div> */}

                    <div id="input-fields">
                        <TextField
                            id="with-placeholder"
                            label="Valor"
                            className={classes.textField}
                            margin="normal"
                            value={this.state.weight}
                            onChange={(e)=>{this.onChangeState('weight', e.target.value)}}
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

WeightInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightInput);