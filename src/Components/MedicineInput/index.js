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

const units = [
    {
      value: 'mg',
      label: 'mg',
    },
    {
      value: 'ml',
      label: 'ml',
    },
];

class MedicineInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            medicineName        : '',
            drugName            : '',
            drugDose            : '',
            doseUnits           : '',
            changeDate          : '',
            patientsMedicines   : [],
            dailyDose0          : null,
            dailyDose1          : null,
            dailyDose2          : null,
            dailyDose3          : null,
            dailyDose4          : null,
            dailyDose5          : null,
            dailyDose6          : null,
            dailyDose7          : null,
            dailyDose8          : null,
            dailyDose9          : null,
            dailyDose10         : null,
            dailyDose11         : null,
            dailyDose12         : null,
            dailyDose13         : null,
            dailyDose14         : null,
            dailyDose15         : null,
            dailyDose16         : null,
            dailyDose17         : null,
            dailyDose18         : null,
            dailyDose19         : null,
            dailyDose20         : null,
            dailyDose21         : null,
            dailyDose22         : null,
            dailyDose23         : null,
        };

        this.onNewMedicine = this.onNewMedicine.bind(this);
    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {

            //console.log('el res.patientsMedicines es = ', res.patientsMedicines)
            let medicines = res.patientsMedicines;
            console.log('medicines = ', medicines);

            this.setState({ 
                patientsMedicines  : medicines,
            });
            console.log('patientsMedicine del state = ', this.state.patientsMedicines)

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

        let dCode = Calculations.generateCode()

        // Estructura del Obj = {Droga: droga, dailyDose : [0,0,0,0,15,0,0, . . . .] }
        let newMedicineObj = {
            drugCode    : dCode,
            drugName    : this.state.drugName, 
            dailyDose   : [
            this.state.dailyDose0, 
            this.state.dailyDose1, 
            this.state.dailyDose2, 
            this.state.dailyDose3, 
            this.state.dailyDose4, 
            this.state.dailyDose5, 
            this.state.dailyDose6, 
            this.state.dailyDose7, 
            this.state.dailyDose8, 
            this.state.dailyDose9, 
            this.state.dailyDose10,
            this.state.dailyDose11,
            this.state.dailyDose12,
            this.state.dailyDose13,
            this.state.dailyDose14,
            this.state.dailyDose15,
            this.state.dailyDose16,
            this.state.dailyDose17,
            this.state.dailyDose18,
            this.state.dailyDose19,
            this.state.dailyDose20,
            this.state.dailyDose21,
            this.state.dailyDose22,
            this.state.dailyDose23]
        };

        console.log('el newMedicineObj = ', newMedicineObj);

        let transMedicineArray = this.state.patientsMedicines;

        // if(transMedicineArray.length === 0){
        //     transMedicineArray[0] = newMedicineObj;
        // } else {
        //     transMedicineArray.push(newMedicineObj);
        // }
        
        transMedicineArray.push(newMedicineObj)

        this.setState({
            patientsMedicines : transMedicineArray,
        });

        console.log('el patientsMedicines a agregar = ', this.state.patientsMedicines);

        DataService.addNewMedicineToPatient(this.state.patientId, this.state.patientsMedicines);
        
        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>Registrar una medicación</h4>
            </div>

            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onNewMedicine}>
            
                <div id="input-dose-area">

                    <div id="input-fields-select">
                        <TextField
                            id="date"
                            label="Fecha de inicio o cambio de dosis"
                            type="date"
                            defaultValue="dd/mm/yyyy"
                            className={classes.textField}
                            value={this.state.changeDate}
                            onChange={(e)=>{this.onChangeState('changeDate', e.target.value)}}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            id="standard-name"
                            label="Nombre de la droga"
                            className={classes.textField}
                            value={this.state.drugName}
                            onChange={(e)=>{this.onChangeState('drugName', e.target.value)}}
                            margin="normal"
                        />
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            select
                            label="Unidades"
                            className={classNames(classes.margin, classes.textField)}
                            value={this.state.doseUnits}
                            onChange={(e)=>{this.onChangeState('doseUnits', e.target.value)}}

                        >
                            {units.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div id="input-fields-select">
                        <TextField
                            id="standard-name"
                            label="Dosis"
                            className={classes.textField}
                            value={this.state.drugDose}
                            onChange={(e)=>{this.onChangeState('drugDose', e.target.value)}}
                            margin="normal"
                        />
                    </div>

                    <div id="ddose-input-area">
                        <div className="list-title">
                            <h2>Dosis diaria del medicamento</h2>
                        </div>
                        <div className="days-list-header">
                            <ul>
                                <li id="single-day">0</li>
                                <li id="single-day">1</li>
                                <li id="single-day">2</li>
                                <li id="single-day">3</li>
                                <li id="single-day">4</li>
                                <li id="single-day">5</li>
                                <li id="single-day">6</li>
                                <li id="single-day">7</li>
                                <li id="single-day">8</li>
                                <li id="single-day">9</li>
                                <li id="single-day">10</li>
                                <li id="single-day">11</li>
                                <li id="single-day">12</li>
                                <li id="single-day">13</li>
                                <li id="single-day">14</li>
                                <li id="single-day">15</li>
                                <li id="single-day">16</li>
                                <li id="single-day">17</li>
                                <li id="single-day">18</li>
                                <li id="single-day">19</li>
                                <li id="single-day">20</li>
                                <li id="single-day">21</li>
                                <li id="single-day">22</li>
                                <li id="single-day">23</li>
                            </ul>
                        </div>
                        <div className="dose-inputs">
                           
                            <input 
                                type="number" 
                                value={this.state.dailyDose0} 
                                onChange={(e)=>{this.onChangeState('dailyDose0', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose1} 
                                onChange={(e)=>{this.onChangeState('dailyDose1', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose2} 
                                onChange={(e)=>{this.onChangeState('dailyDose2', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose3} 
                                onChange={(e)=>{this.onChangeState('dailyDose3', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose4} 
                                onChange={(e)=>{this.onChangeState('dailyDose4', e.target.value)}}
                            />
                                                        <input 
                                type="number" 
                                value={this.state.dailyDose5} 
                                onChange={(e)=>{this.onChangeState('dailyDose5', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose6} 
                                onChange={(e)=>{this.onChangeState('dailyDose6', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose7} 
                                onChange={(e)=>{this.onChangeState('dailyDose7', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose8} 
                                onChange={(e)=>{this.onChangeState('dailyDose8', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose9} 
                                onChange={(e)=>{this.onChangeState('dailyDose9', e.target.value)}}
                            />
                                                        <input 
                                type="number" 
                                value={this.state.dailyDose10} 
                                onChange={(e)=>{this.onChangeState('dailyDose10', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose11} 
                                onChange={(e)=>{this.onChangeState('dailyDose11', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose12} 
                                onChange={(e)=>{this.onChangeState('dailyDose12', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose13} 
                                onChange={(e)=>{this.onChangeState('dailyDose13', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose14} 
                                onChange={(e)=>{this.onChangeState('dailyDose14', e.target.value)}}
                            />
                                                        <input 
                                type="number" 
                                value={this.state.dailyDose15} 
                                onChange={(e)=>{this.onChangeState('dailyDose15', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose16} 
                                onChange={(e)=>{this.onChangeState('dailyDose16', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose17} 
                                onChange={(e)=>{this.onChangeState('dailyDose17', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose18} 
                                onChange={(e)=>{this.onChangeState('dailyDose18', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose19} 
                                onChange={(e)=>{this.onChangeState('dailyDose19', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose20} 
                                onChange={(e)=>{this.onChangeState('dailyDose20', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose21} 
                                onChange={(e)=>{this.onChangeState('dailyDose21', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose22} 
                                onChange={(e)=>{this.onChangeState('dailyDose22', e.target.value)}}
                            />

                            <input 
                                type="number" 
                                value={this.state.dailyDose23} 
                                onChange={(e)=>{this.onChangeState('dailyDose23', e.target.value)}}
                            />


                            
                    
                        </div>
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