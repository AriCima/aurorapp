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
            patientId  : this.props.patID,
            drugName   : this.props.dName,
            drugInfo   : []
        };

        this.onEditDose = this.onEditDose.bind(this);
    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {

            let loadedMed       = res.medArray;
            let drugInfo        = [];
            let weightsCopy     = [...res.patientsWeight];
            let weightsSorted   = Calculations.sortReadingsByDate(weightsCopy);
            
            for(let i=0; i<loadedMed.length; i++){
                if(this.state.drugName.toUpperCase() === loadedMed[i].drugName.toUpperCase())
                drugInfo = [...loadedMed[i]];
            }

            this.setState({ 
                drugInfo        : drugInfo,
                patientsWeights : weightsSorted,
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

  _medicinesGraphicData(){

    let pMeds     = [...this.state.medArray];
    let pWeight   = [...this.state.patientsWeights];
    let daysBack  = 60;
    let today     = new Date();
    let startDate = today.setDate(today.getDate() - daysBack);

    let dataFirst = [ { type: 'date', label: 'Día' }, 'Peso']
    let dataArray = [[dataFirst]]

    // for (let l = 0; l < pMeds.length; l++){
    //   dataFirst.push(pMeds[l].drugName);
      
    // };
  
    // estructura del medArray = [{drugName1: '', dose:[{date, dayDose},{date, dayDose},  . . . .]},
    // [new Date(2014, 0), -0.5, 5.7],
    // {drugName2: '', dose:[{date, dayDose},{date, dayDose},  . . . .]}  ];

    let graphicMeds  = [];

    // Iteración entre fechas --> https://stackoverflow.com/questions/4345045/javascript-loop-between-date-ranges

    for (let i = 0; i <= daysBack; i++ ){   // --> iteración desde fecha inicio hasta hoy
      let dayDosis      = [];
      let resultante    = [];
      let date          = new Date(startDate); 
      let dateForArray  = date.setDate(date.getDate() + i); // --> date para el graphics Array
      
      let day = new Date(dateForArray).getDate().toString();
      let month = (new Date(dateForArray).getMonth()+1).toString();
      let year = new Date(dateForArray).getFullYear().toString();

      let defDate = year +','+ month +','+ day;

      let wLength = pWeight.length;
      let weight = 0;

      for (let w = 0; w < wLength-1; w++){

        // console.log('pWeight = ', pWeight);

        // console.log('pWeight.readingValue = ', pWeight[w].readingValue);

        let date0 = new Date(pWeight[0].readingDate) // --> comienzo de toma 
        let dateD = new Date(pWeight[w].readingDate)
        let dateD1 = new Date(pWeight[w+1].readingDate)
        let lastDate = new Date (pWeight[wLength-1].readingDate)

       
        if( date < date0){
          weight = 0;

        } else if ( date >= dateD && date < dateD1) {
          weight = pWeight[w].readingValue;
          

        } else if ( date > lastDate){
          weight = pWeight[wLength-1].readingValue; 
        
        }

       //  console.log('medDose = ', medDose)
        
      }

      

      for (let j=0; j < pMeds.length; j++){  // --> iteración por medicinas
        
        let medName = pMeds[j].drugName;
        let doseLength = pMeds[j].dose.length;
        let medDose = 0;

        if(pMeds[j] === this.state.drugName){

            for(let d=0; d < doseLength-1; d++){  // --> iteración por dosis de una misma medicina
            
            let date0 = new Date(pMeds[j].dose[0].date) // --> comienzo de toma 
            let dateD = new Date(pMeds[j].dose[d].date)
            let dateD1 = new Date(pMeds[j].dose[d+1].date)
            let lastDate = new Date (pMeds[j].dose[doseLength-1].dailyDose)

            if( date < date0){
                medDose = 0;

            } else if ( date >= dateD && date < dateD1) {
                medDose = pMeds[j].dose[d].dailyDose;
                

            } else if ( date > lastDate){
                medDose = pMeds[j].dose[doseLength-1].dailyDose 
            
            }

            //  console.log('medDose = ', medDose)

            }

            resultante.unshift(medDose);

            graphicMeds.push(medName);
        }

      }
      
      resultante.unshift(new Date(defDate), Number(weight));
      
      dataArray.push(resultante);

    }

    console.log('EL DATAARRAY de : ', this.state.drugName, ' = ', dataArray);
    return dataArray 
  };


    onEditDose(e){

        
        e.preventDefault();       
        let names           = [...this.state.medNamesArray]
        let currentMed      = [...this.state.medArray];
        let newDrugName     = this.state.drugName;
        let newDate         = this.state.changeDate;
        let newHourlyDose   = [
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
        let dCode           = Calculations.generateCode()

        let totalDayDose = Number(this.state.dailyDose0) + Number(this.state.dailyDose1) + Number(this.state.dailyDose2) + Number(this.state.dailyDose3) + Number(this.state.dailyDose4) + Number(this.state.dailyDose5) + Number(this.state.dailyDose6) + Number(this.state.dailyDose7) + Number(this.state.dailyDose8) +
        Number(this.state.dailyDose9) + Number(this.state.dailyDose10) + Number(this.state.dailyDose11) + Number(this.state.dailyDose12) + Number(this.state.dailyDose13) + Number(this.state.dailyDose14) + Number(this.state.dailyDose15) + Number(this.state.dailyDose16) + Number(this.state.dailyDose17) + Number(this.state.dailyDose18) +
        Number(this.state.dailyDose20) + Number(this.state.dailyDose21) + Number(this.state.dailyDose22) + Number(this.state.dailyDose23);


        let newDose = {date: newDate, hourlyDose: newHourlyDose, dailyDose: totalDayDose};
        let newMedArr = [newDose];

        let index = names.indexOf(newDrugName.toUpperCase());

        if(index < 0){
            let newDrug = {drugName: newDrugName.toUpperCase(), dose: newMedArr};
            currentMed.push(newDrug);
        } else {
            console.log('EL MEDICAMENTO YA LO TOMA')
            currentMed[index].dose.push(newDose); 
            console.log('El current med es: ', currentMed)
        }
       

        DataService.newMedicineRegister(this.state.patientId, currentMed);
        
        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
    };

  
  render() {
    const { classes } = this.props;

    return (

        <div className="form-container">

            <div className="form-title">
                <h4>{this.state.drugName}</h4>
                <p>Dosis y suministros</p>
            </div>


            <div>
                <h1>Lines chart DOSIS vs PESO</h1>
            </div>


            <form  id="form-format" className={classes.container} noValidate autoComplete="off" onSubmit={this.onEditDose}>
            
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
                            <h2>Dosis horaria del medicamento</h2>
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