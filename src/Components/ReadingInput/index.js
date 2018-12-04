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
      value: 'Temperature',
      label: 'Temperatura',
    },
    {
      value: 'weight',
      label: 'Peso',
    },
];
  

class ReadingInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId       : this.props.patientID,
            patientName     : '',
            readingtype     : '',
            readingtype     : '',
            readingDate     : '',

        };

        this.onNewReading             = this.onNewReading.bind(this);

    }


    onChangeState(field, value){
        let aptInfo = this.state;
        aptInfo[field] = value;
        this.setState(aptInfo)
    };

    onNewReading(e){
        e.preventDefault();       

        let newState = this.state;

        DataService.addNewReading(newState);
        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
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
                   
                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Tipo de medición"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.roomsRental}
                            //onChange={this.onChangeRentalType}
                            onChange={(e)=>{this.onChangeState('readingType', e.target.value)}}

                        >
                            {readingTypes.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
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

ReadingInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadingInput);