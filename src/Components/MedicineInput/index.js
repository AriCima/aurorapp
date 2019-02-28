import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// ACCESORIES
import SubmitButton from '../Accessories/MyButtonPlain';

import './index.css'; 

export default class MedicineInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            medicineName        : '',
            drugName            : '',
            drugDose            : '',
            doseUnits           : '',
            date                : '',
            patientsMedicines   : [],
            medNamesArray       : [],    // --> array con solo los nombres para usar en "select"
            medArray            : [],    // --> array con todo el registro completo de los medicamentos, fechas de cambio y dosis
            dailyDose0          : '',
            dailyDose1          : '',
            dailyDose2          : '',
            dailyDose3          : '',
            dailyDose4          : '',
            dailyDose5          : '',
            dailyDose6          : '',
            dailyDose7          : '',
            dailyDose8          : '',
            dailyDose9          : '',
            dailyDose10         : '',
            dailyDose11         : '',
            dailyDose12         : '',
            dailyDose13         : '',
            dailyDose14         : '',
            dailyDose15         : '',
            dailyDose16         : '',
            dailyDose17         : '',
            dailyDose18         : '',
            dailyDose19         : '',
            dailyDose20         : '',
            dailyDose21         : '',
            dailyDose22         : '',
            dailyDose23         : '',
            totalDailyDose      : '',
        };

        this.onNewMedicine = this.onNewMedicine.bind(this);
    }

    componentDidMount(){
    
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {

            let medicines = res.patientsMedicines;
            // let loadedMed = res.medArray;

            let medNames = [];
            for(let i=0; i<medicines.length; i++){
                medNames[i] = medicines[i].drugName;
            }

            this.setState({ 
                patientsMedicines   : medicines,
                // medArray            : loadedMed,
                medNamesArray   : medNames,
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

        console.log('submitbutton WORKS');

         // NUEVO PLANTEAMINETO:
         //   armar un array de medicamentos por cada paciente con la siguiente estructura:
         //  patientsMedicines = [ [{drugName: name, drugUnits: units, dose:[{1},{2}, . .  .{n}] }]    
         //  más específicamente:
         //  patientsMedicines = [ [{nombre: xxx, dosis: [{fecha: xx, dosisHoraria :[x,..,x], dosisDiaria: xx}, {fecha: jj, dosisHoraria :[j,..,j], dosisDiaria: jj} ] }],
         //              [{nombre: yyy, dosis: [{fecha: yy, dosisHoraria :[y,..,y], dosisDiaria: yy}]}]

        e.preventDefault();       
        let names           = [...this.state.medNamesArray]
        let currentMed      = [...this.state.patientsMedicines];
        let newDrugName     = this.state.drugName;
        let newDate         = this.state.date      ;
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
        let units           = this.state.doseUnits;
        let dCode           = Calculations.generateCode();

        console.log('drugUnits = ', this.state.doseUnits);
        console.log('newDate = ', newDate);

        let totalDayDose = Number(this.state.dailyDose0) + Number(this.state.dailyDose1) + Number(this.state.dailyDose2) + Number(this.state.dailyDose3) + Number(this.state.dailyDose4) + Number(this.state.dailyDose5) + Number(this.state.dailyDose6) + Number(this.state.dailyDose7) + Number(this.state.dailyDose8) +
        Number(this.state.dailyDose9) + Number(this.state.dailyDose10) + Number(this.state.dailyDose11) + Number(this.state.dailyDose12) + Number(this.state.dailyDose13) + Number(this.state.dailyDose14) + Number(this.state.dailyDose15) + Number(this.state.dailyDose16) + Number(this.state.dailyDose17) + Number(this.state.dailyDose18) + Number(this.state.dailyDose19) +
        Number(this.state.dailyDose20) + Number(this.state.dailyDose21) + Number(this.state.dailyDose22) + Number(this.state.dailyDose23);


        let newDose = {date: newDate, hourlyDose: newHourlyDose, dailyDose: totalDayDose, drugUnits: units};
        let dosis = [];
        dosis.push(newDose);

        let index = names.indexOf(newDrugName.toUpperCase());

        if(index < 0){   // --> si el medicamento no lo tomaba, se agrgan todos los datos.
            let newDrug = {drugName: newDrugName.toUpperCase(), drugUnits: units, dose: dosis};
            currentMed.push(newDrug);
        } else {        // --> si el medicamento YA lo tomaba, solo se agrega la nueva dosis.
            console.log('EL MEDICAMENTO YA LO TOMA')
            currentMed[index].dose.push(newDose); 
            console.log('El current med es: ', currentMed)
        };
       

        DataService.newMedicineRegister(this.state.patientId, currentMed);
        
        this.props.propsFn.push(`/patient/${this.state.patientId}`)
        
    };

  
  render() {

    return (

        <div className="med-form-container">

            <div className="med-form-title">
                <h2>Nuevo medicamento</h2>
            </div>

            <form  id="med-form-format" onSubmit={this.onNewMedicine}>
            
                <div id="med-input-area">

                    <div className="med-input-row">

                        <label className="med-label-date">
                            <p>Fecha</p>
                            <input id="med-input"
                                size="150"
                                type="date"
                                value={this.state.date}
                                onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                            /> 
                        </label>

                        <label className="med-label-info">
                            <p>Nombre de la droga</p>
                            <input id="med-input"
                                size="150"
                                type="text"
                                value={this.state.drugName}
                                onChange={(e)=>{this.onChangeState('drugName', e.target.value)}}
                            /> 
                        </label>


                        <label className="med-label-info">
                            <p>Dosis</p>
                            <input id="med-input"
                                size="150"
                                type="text"
                                value={this.state.drugDose}
                                onChange={(e)=>{this.onChangeState('drugDose', e.target.value)}}
                            /> 
                        </label>
                   

                        <label className="med-label-short">
                            <p>Unidades</p>
                            <select id="med-select-input" 
                                value={this.state.doseUnits} 
                                onChange={(e)=>{this.onChangeState('doseUnits', e.target.value)}}>
                                <option selected value="mg">mg</option>
                                <option value="ml">ml</option>
                            </select>
                        </label>

                    </div>

                    <div className="med-input-row">

                        <div className="doses-input">

                        <div className="med-list-title">
                            <h2>Detalle a continuación la dosis horaria del medicamento</h2>
                        </div>

                        <div className="hs-inputs">
                            <div className="ul-equivalent">
                                    <div id="single-day">0</div>
                                    <div id="single-day">1</div>
                                    <div id="single-day">2</div>
                                    <div id="single-day">3</div>
                                    <div id="single-day">4</div>
                                    <div id="single-day">5</div>
                                    <div id="single-day">6</div>
                                    <div id="single-day">7</div>
                                    <div id="single-day">8</div>
                                    <div id="single-day">9</div>
                                    <div id="single-day">10</div>
                                    <div id="single-day">11</div>
                                    <div id="single-day">12</div>
                                    <div id="single-day">13</div>
                                    <div id="single-day">14</div>
                                    <div id="single-day">15</div>
                                    <div id="single-day">16</div>
                                    <div id="single-day">17</div>
                                    <div id="single-day">18</div>
                                    <div id="single-day">19</div>
                                    <div id="single-day">20</div>
                                    <div id="single-day">21</div>
                                    <div id="single-day">22</div>
                                    <div id="single-day">23</div>
                                </div>

                            <div className="dose-inputs">
                           
                           <div className="hourly-input">
                                <input  id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose0} 
                                    onChange={(e)=>{this.onChangeState('dailyDose0', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose1} 
                                    onChange={(e)=>{this.onChangeState('dailyDose1', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3" 
                                    value={this.state.dailyDose2} 
                                    onChange={(e)=>{this.onChangeState('dailyDose2', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose3} 
                                    onChange={(e)=>{this.onChangeState('dailyDose3', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3" 
                                    value={this.state.dailyDose4} 
                                    onChange={(e)=>{this.onChangeState('dailyDose4', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3" 
                                    value={this.state.dailyDose5} 
                                    onChange={(e)=>{this.onChangeState('dailyDose5', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose6} 
                                    onChange={(e)=>{this.onChangeState('dailyDose6', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose7} 
                                    onChange={(e)=>{this.onChangeState('dailyDose7', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose8} 
                                    onChange={(e)=>{this.onChangeState('dailyDose8', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose9} 
                                    onChange={(e)=>{this.onChangeState('dailyDose9', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3" 
                                    value={this.state.dailyDose10} 
                                    onChange={(e)=>{this.onChangeState('dailyDose10', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose11} 
                                    onChange={(e)=>{this.onChangeState('dailyDose11', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose12} 
                                    onChange={(e)=>{this.onChangeState('dailyDose12', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose013} 
                                    onChange={(e)=>{this.onChangeState('dailyDose13', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose14} 
                                    onChange={(e)=>{this.onChangeState('dailyDose14', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose15} 
                                    onChange={(e)=>{this.onChangeState('dailyDose15', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose16} 
                                    onChange={(e)=>{this.onChangeState('dailyDose16', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose17} 
                                    onChange={(e)=>{this.onChangeState('dailyDose17', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose18} 
                                    onChange={(e)=>{this.onChangeState('dailyDose18', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose19} 
                                    onChange={(e)=>{this.onChangeState('dailyDose19', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose20} 
                                    onChange={(e)=>{this.onChangeState('dailyDose20', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose21} 
                                    onChange={(e)=>{this.onChangeState('dailyDose21', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose22} 
                                    onChange={(e)=>{this.onChangeState('dailyDose22', e.target.value)}}
                                />
                            </div>
                            <div className="hourly-input">
                                <input id="input-dosis"
                                    type="text" 
                                    size="3"
                                    value={this.state.dailyDose23} 
                                    onChange={(e)=>{this.onChangeState('dailyDose23', e.target.value)}}
                                />
                            </div>

                    
                        </div>
                        
                        </div>
                    </div>
                    </div>
                   
                </div>

                <div className="med-button-area"> 
                    <SubmitButton text={'GUARDAR'} fn={this.onNewMedicine}/>
                </div>
              
            </form>

        </div>
    );
  }
}
