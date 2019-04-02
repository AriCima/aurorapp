import React from 'react';

// SERVICE API
import DataService from '../services/DataService';

// ACCESORIES
import SubmitButton from '../Accessories/MyButtonPlain';
import SelectCreate from '../Accessories/SelectCreate';

// CSS
import './index.css'; 

const genericMeds = [
    {label: 'Neurofarman', value:'neurofarm'}, 
    {label: 'Carbamacepina, CBZ (Tegretol)', value:'carbamacepina'} , 
    {label: 'Oxcarbazepina, OXC (Trileptal, Epilexter)', value:'oxcarbazepina'}, 
    {label: 'Etosuximida, ESM', value:'etosuximida'},
    {label: 'Fenitoína, PHT (Epanutin, Neosidantoina, Sinergina)', value: 'fenitoína'},
    {label: 'Gabapentina GBP (Neurontin)', value: 'gabapentina'}, 
    {label: 'Lacosamida (Vimpar)', value: 'Lacosamida'},
    {label: 'Lamotrigin, LTG (Crisomet, Labileno, Lamictal)', value: 'lamotrigin'}, 
    {label: 'Levetiracetam, LEV (Keppra)', value:'levetiracetam'},
    {label: 'Retigabina (Trobalt)', value:'retigabina'},
    {label: 'Rufinamida, DCI (Inovelon)', value: 'rufinamida'},
    {label: 'Tiagabina, TGB (Gabitril)', value:'tiagabina' },
    {label: 'Topiramato, TPM (Topamax)', value: 'topiramato'},
    {label: 'Valproato, VPA (Depakine)', value: 'valproato'}, 
    {label: 'Vigabatrina, VGB (Sabrilex)', value:'vigabatrina'}, 
    {label: 'Zonisamida, ZNS (Zonegran)', value: 'zonisamida' },
    {label: 'Acetazolamida (Edemox)', value: 'acetazolamida'},
    {label: 'Acetato Eslicarbazepina, ESL 800 (Zebinix – 800)', value: 'acetato_eslicarbazepina'},
    {label: 'Estiripentol, STP (Diacomit)', value: 'estiripentol'},
    {label: 'Felbamato FBM, (Taloxa)', value: 'felbamato'},
    {label: 'Fosfenitoina Sódica', value:'fosfenitoina_sodica'}, 
    {label: 'Pregabalina, PGB (Lyrica)', value: 'pregabalina'}, 
    {label: 'Safinamida', value: 'safinamida'}, 
    {label: 'Talampanel', value: 'talampanel'},
    {label: 'Valrocemida', value: 'valrocemida'},
    {label: 'Corticoides (ACTH), Inmunoglobulinas u otros Inmunomoduladores', value:'corticoides'}
];

const units = [
    {label: 'mg', value: 'mg'},
    {label: 'ml', value: 'ml'}
];

export default class MedicineInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            ownMeds             : [],
            medsValues          : [],
            allMeds             : [],
            drugName            : '',
            ownDrugName         : '',
            drugDose            : '',
            doseUnits           : 'mg',
            date                : '',
            dailyDoses          : Array(24).fill(""),
            // dailyDose0          : '',
            // dailyDose1          : '',
            // dailyDose2          : '',
            // dailyDose3          : '',
            // dailyDose4          : '',
            // dailyDose5          : '',
            // dailyDose6          : '',
            // dailyDose7          : '',
            // dailyDose8          : '',
            // dailyDose9          : '',
            // dailyDose10         : '',
            // dailyDose11         : '',
            // dailyDose12         : '',
            // dailyDose13         : '',
            // dailyDose14         : '',
            // dailyDose15         : '',
            // dailyDose16         : '',
            // dailyDose17         : '',
            // dailyDose18         : '',
            // dailyDose19         : '',
            // dailyDose20         : '',
            // dailyDose21         : '',
            // dailyDose22         : '',
            // dailyDose23         : '',
            totalDailyDose          : '',
            medsLabels              : [],
        };

        this.onNewMedicine      = this.onNewMedicine.bind(this);
        this.onChangeState      = this.onChangeState.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }


    componentDidMount() {
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
            const pat = res;

            let ownMeds = pat.ownMeds;
            let allMeds = genericMeds.concat(ownMeds);

            let indexM  = allMeds.length;

            let medsLabels = [];  // array witn only meds labels to verify if the input med already exists

            for (let i = 0; i < indexM; i++){
                console.log('allMeds[',i,'].label', allMeds[i].label)
                medsLabels.push((allMeds[i].label).toUpperCase());
            };
            this.setState({
                ownMeds     : pat.ownMEds,
                allMeds     : allMeds,
                medsLabels  : medsLabels,
                // medsValues: medsValues,
            });

        })
        .catch(function(error) {
        console.log(error);
        });

    }

    handleSelection = ({ field, value }) => {
        this.setState({
          [field]: value
        });
    };

    onChangeState(field, value){
        let medInfo = this.state;
        medInfo[field] = value;
        this.setState(medInfo)
    };

    handleChangeSelect(event) {
        console.log('handle change launched')
        console.log('event', event.target.value)
        this.setState({doseUnits: event.target.value});
    }

    onNewMedicine(e){

        let drugExists = this.state.medsLabels.indexOf(this.state.drugName);

        e.preventDefault();       
        let newDrugName   = this.state.drugName;
        let newDate       = this.state.date;
        let units         = this.state.doseUnits;
        let newHourlyDose = [...this.state.dailyDoses];

        let totalDayDose = 0;

        for (let i = 0; i <= 23; i++){
          totalDayDose = totalDayDose + +newHourlyDose[i];
        };

        let newMedInfo = {patientId: this.state.patientId, drugName: newDrugName.toUpperCase(), date: newDate, hourlyDose: newHourlyDose, dailyDose: totalDayDose, drugUnits: units}
       
        DataService.newMedicine(newMedInfo)
        .then(res =>{
            console.log(res.id, ' medicine succesfully registered ! ! !');
            this.props.propsFn.push(`/patient/${this.state.patientId}`)
        })
        .catch(function (error) {    
            console.log(error);
        }) ;
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
                                // onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                                onChange={e =>
                                    this.handleSelection({
                                      field: "date",
                                      value: this.state.date
                                    })
                                }
                            /> 
                        </label>

                        <label className="med-label-info">
                            <p>Nombre de la droga</p>
                                <SelectCreate options={this.state.allMeds} field={'ownDrugName'} fn={this.handleSelection}/>
                            {/* <input id="med-input"
                                size="150"
                                type="text"
                                value={this.state.drugName}
                                onChange={(e)=>{this.onChangeState('drugName', e.target.value)}}
                            />  */}
                        </label>


                        <label className="med-label-info">
                            <p>Dosis</p>
                            <input id="med-input"
                                size="150"
                                type="text"
                                value={this.state.drugDose}
                                // onChange={(e)=>{this.onChangeState('drugDose', e.target.value)}}
                                onChange={e =>
                                    this.handleSelection({
                                      field: "drugDose",
                                      value: this.state.drugDose
                                    })
                                }
                            /> 
                        </label>
                   

                        <label className="med-label-short">
                            <p>Unidades</p>

                            <SelectCreate options={units} fn={this.handleSelection}/>

                            {/* <select id="med-select-input" 
                                value={this.state.doseUnits} 
                                onChange={this.handleChangeSelect}>
                                <option value="mg">mg</option>
                                <option value="ml">ml</option>
                            </select> */}
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
                           
                           {this.state.dailyDoses.map((dose, i)=> {
                               return(
                                   
                                <div key={i}className="hourly-input">
                                    <input id="input-dosis"
                                        type="text" 
                                        size="3"
                                        value={this.state.dailyDoses[i]} 
                                        onChange={(e)=>{
                                            const newDoses = [...this.state.dailyDoses];
                                            newDoses[i] = e.target.value
                                            this.setState({dailyDoses: newDoses}) 
                                        }}
                                    />
                                </div>
                               )
                           })

                           }
                           {/* <div className="hourly-input">
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
                                    value={this.state.dailyDose[i]} 
                                    onChange={(e)=>{
                                        const newDoses = [...this.state.dailyDoses];
                                        newDoses[i] = e.target.value
                                        this.setState({dailyDoses: newDoses}) 
                                    }}
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
                            </div> */}

                    
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
