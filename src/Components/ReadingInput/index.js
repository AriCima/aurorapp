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
      value: 'fever',
      label: 'Temp [ºC]',
    },
    {
      value: 'weight',
      label: 'Peso [Kg]',
    },
];
  

class MedicineInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            medicineName        : '',
            medicineDrug        : '',
            drugDose            : '',
            dailyDose           : [],
        };

        this.onNewMedicine             = this.onNewMedicine.bind(this);

    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
        
            this.setState({ 
                medicineName    : res.medicineName,
                medicineDrug    : res.medicineDrug,
                mdedicineDose   : res.mdedicineDose,
            });

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

    onNewMedicine(e){
        e.preventDefault();       

        let NewMedicine = {
            patientId       : this.props.patID,
            patientName     : this.state.patientName,
            patientSurname  : this.state.patientSurname,
            readingDate     : this.state.readingDate,
            readingValue    : this.state.readingValue,
        };

        DataService.addNewMedicine(this.state.readingType, NewMedicine)
        .then((result) => {

            NewMedicine.medicineId = result.id;


            let medicineArray = [...this.state.patientMedicine];
            medicineArray.push(NewMedicine);
            this.setState({
                patientMedicine : medicineArray,
            })
            DataService.addNewMedicineToPatient(this.state.patientId, this.state.patientMedicine);
            this.props.propsFn.push(`/patient/${this.state.patientId}`)

        })
        .catch(function (error) {    
            console.log(error);
        })

        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>Registrar una medición</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewMedicine}>
            
                <div id="input-area">

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Tipo de medición"
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