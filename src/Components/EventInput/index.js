import React from 'react';

// SERVICE API
import DataService from '../services/DataService';

import CustomDropZone from '../CustomDropZone';

// MATERIAL UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

//ACCESORIES
import SubmitButton from '../Accessories/SubmitButton';

// CSS
import './index.css'; 


const styles = {
    root: {
      color: 'rgba(0, 144, 248, 1)',
      '&$checked': {
        color: 'rgba(0, 144, 248, 1)',
      },
    },
    checked: {
        color: 'rgba(0, 144, 248, 1)',
        '&$checked': {
          color: 'rgba(0, 144, 248, 1)',
        },
    },
};


class EventInput extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,

            date                : '',
            startTime           : '',
            duration            : '',

            type                : '',
            typesID             : '',
            ownType             : '',
            ownTypes            : [],

            state               : '',

            intensity           : '',

            detonation          : '',
            ownDetonation       : '',
            ownDetonations      : [],
            detosID             : '',

            clinicObservation   : '',
            action              : '',

            patientsEvents      : [],
        };

        this.onNewEvent                 = this.onNewEvent.bind(this);
        this.onChangeState              = this.onChangeState.bind(this);
        this.handleTypeChange           = this.handleTypeChange.bind(this);
        this.handleDetonationChange     = this.handleDetonationChange.bind(this);
        this.handleStateChange          = this.handleStateChange.bind(this);
        this.handleIntensityChange      = this.handleIntensityChange.bind(this);
        
    }
    componentDidMount(){
        DataService.getPatientInfo(this.state.patientId)
        .then(res => {
          const pat = res;
         // console.log("Res del patientInfo: ", res)
          this.setState({ 
            patientsEvents   : pat.patientsEvents,        
          });
        })
        .catch(function (error) {    
          console.log(error);
        }) 
        
        DataService.getEventOwnType(this.state.patientId).then(res => {
            console.log('res ownTypes = ', res)
            this.setState({ 
                ownTypes   : res.ownTypes,
                typesID    : res.id,
            });
            console.log('this.state.ownTypes', this.state.ownTypes)

        }).catch(function (error) {
            console.log(error);
        }) 

        DataService.getOwnDetonations(this.state.patientId).then(res => {
            
            this.setState({ 
                ownDetonations  : res.ownDetonations,  
                detosID         : res.id, 
            });
        })
        .catch(function (error) {    
            console.log(error);
        }) 

    }
   
    onChangeState(field, value){
        let eventInfo = this.state;
        eventInfo[field] = value;
        this.setState(eventInfo)
    };
    handleTypeChange = event => {
        this.setState({ type: event.target.value });
    };
    handleDetonationChange = event => {
        this.setState({ detonation: event.target.value });
    };
    handleStateChange = event => {
        this.setState({ state: event.target.value });
    };
    handleIntensityChange = event => {
        this.setState({ intensity: event.target.value });
    };


    onNewEvent(e){
        e.preventDefault();    

        let patID = this.props.patID;

        let newEvent = {
            patientId           : patID,
            date                : this.state.date,
            startTime           : this.state.startTime,
            duration            : this.state.duration,
            type                : this.state.type,
            ownType             : this.state.ownType,
            clinicObservation   : this.state.clinicObservation,
            action              : this.state.action,
            detonation          : this.state.detonation,
            ownDetonation       : this.state.ownDetonation,
            intensity           : this.state.intensity,
            state               : this.state.state,
        }

        DataService.newEvent(newEvent)
        .then((result) => {

            console.log(result.id, ' event succesfully registered !!!')
            this.props.propsFn.push(`/patient/${this.state.patientId}`)
        })
        .catch(function (error) {    
            console.log(error);
        })

        let oType = this.state.ownType;
        let types = this.state.ownTypes;
        let typesID = this.state.typesID;
        let oDet  = this.state.ownDetonation;
        let detos = this.state.ownDetonations;
        let detosID = this.state.detosID;


        if(types.indexOf(oType) < 0){
            
            types.push(oType);
            console.log('types to update', types)
            DataService.updateOwnEventTypes(typesID, types).then(
            )
            .catch(function (error) {    
                console.log(error);
            })
        };

        if(detos.indexOf(oDet) < 0){
            detos.push(oDet);
            console.log('detos to update', detos)
            DataService.updateOwnEventDetonations(detosID, detos).then(
            )
            .catch(function (error) {    
                console.log(error);
            })
        }

        this.props.propsFn.push(`/patient/${this.state.patientId}`)

    };

  
  render() {
    const { classes } = this.props;
    return (

        <div className="nev-form-container">

            <div className="nev-form-title">
                <h2>Nuevo Evento</h2>
            </div>

            <form  id="nev-form-format" onSubmit={this.onNewEvent}>
            
                <div id="nev-input-area">

                    <div className="nev-input-row" id="back-light">
                    
                        <label className="label-date">
                            <p>Fecha</p>
                            <input className="input-date"
                                size="150"
                                type="date"
                                value={this.state.date}
                                onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                            /> 
                        </label>

                        <label className="label-short">
                            <p>Comienzo [Hr:mm]</p>
                            <input className="input-short" type="text" name="Comienzo"
                                size="150" 
                                value={this.state.startTime}
                                onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                            /> 
                        </label>

                        <label className="label-short">
                            <p>Duración [min]</p>
                            <input className="input-short" type="text" name="Duración"
                                value={this.state.duration}
                                onChange={(e)=>{this.onChangeState('duration', e.target.value)}}
                            /> 
                        </label>
                    </div>

                    <div className="nev-input-select-row" id="back-dark">  

                        <div className="select-row-title">
                            <p>Tipo de crisis</p>
                        </div>
                        <div className="selectors-field">
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'De-Ausencia'}
                                    onChange={this.handleTypeChange}
                                    value='De-Ausencia'
                                    name="radio-button-demo"
                                    aria-label="De-Ausencia"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>De Ausencia</p>
                                </div>
                            </div>    
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Focal'}
                                    onChange={this.handleTypeChange}
                                    value='Focal'
                                    name="radio-button-demo"
                                    aria-label="b"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Focal</p>
                                </div>
                            </div>     
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Mioclonica'}
                                    onChange={this.handleTypeChange}
                                    value='Mioclonica'
                                    name="radio-button-demo"
                                    aria-label="Mioclonica"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Mioclónica</p>
                                </div>
                            </div>   
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Tonica-clonica'}
                                    onChange={this.handleTypeChange}
                                    value='Tonica-clonica'
                                    name="radio-button-demo"
                                    aria-label="Tonica-clonica"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Tónica-clónica</p>
                                </div>
                            </div>   
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Tonica'}
                                    onChange={this.handleTypeChange}
                                    value='Tonica'
                                    name="radio-button-demo"
                                    aria-label="Tonica"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Tónica</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Atonica'}
                                    onChange={this.handleTypeChange}
                                    value='Atonica'
                                    name="radio-button-demo"
                                    aria-label="Atonica"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Atónica</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.type === 'Espasmos'}
                                    onChange={this.handleTypeChange}
                                    value='Espasmos'
                                    name="radio-button-demo"
                                    aria-label="Espasmos"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Espasmos</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                            
                                <Radio
                                    checked={this.state.type === 'Otra'}
                                    onChange={this.handleTypeChange}
                                    value='Otra'
                                    name="radio-button-demo"
                                    aria-label="Otra"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Otra</p>
                                </div>
                                <div className="selector-wrapper">
                                    {this.state.type === 'Otra' &&
                                        <label className="label-short">
                                            <input className="input-short" 
                                                type="text" 
                                                name="ownType"
                                                value={this.state.newType}
                                                onChange={(e)=>{this.onChangeState('ownType', e.target.value)}}
                                            /> 
                                        </label>
                                    }
                                </div>
                            </div>  
                        </div>
                    </div>

                    <div className="nev-input-select-row" id="back-light">  

                        <div className="select-row-title">
                            <p>Detonante</p>
                        </div>
                        <div className="selectors-field">
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Suenio-escaso'}
                                    onChange={this.handleDetonationChange}
                                    value='Suenio-escaso'
                                    name="radio-button-demo"
                                    aria-label="Suenio-escaso"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Sueño escaso</p>
                                </div>
                            </div>   
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Posible-stress'}
                                    onChange={this.handleDetonationChange}
                                    value='Posible-stress'
                                    name="radio-button-demo"
                                    aria-label="Posible-stress"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Posible stress</p>
                                </div>
                            </div>   
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Temp-ambiente'}
                                    onChange={this.handleDetonationChange}
                                    value='Temp-ambiente'
                                    name="radio-button-demo"
                                    aria-label="Temp-ambiente"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Cambio temp ambiente</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Estimulo-luminoso'}
                                    onChange={this.handleDetonationChange}
                                    value='Estimulo-luminoso'
                                    name="radio-button-demo"
                                    aria-label="Estimulo-luminoso"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Estímulo luminoso</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Fiebre'}
                                    onChange={this.handleDetonationChange}
                                    value='Fiebre'
                                    name="radio-button-demo"
                                    aria-label="Fiebre"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Fiebre</p>
                                </div>
                            </div>  
                            <div className="selector-wrapper">
                                <Radio
                                    checked={this.state.detonation === 'Otra'}
                                    onChange={this.handleDetonationChange}
                                    value='Otra'
                                    name="radio-button-demo"
                                    aria-label="Otra"
                                    classes={{
                                        root: classes.root,
                                        checked: classes.checked,
                                    }}
                                />
                                <div className="selector-text">
                                    <p>Otra</p>
                                </div>
                                    <div className="selector-wrapper">
                                        {this.state.detonation === 'Otra' &&
                                            <label className="label-short">
                                                <input className="input-short" 
                                                    type="text" 
                                                    name="ownDetonation"
                                                    value={this.state.ownDetonation}
                                                    onChange={(e)=>{this.onChangeState('ownDetonation', e.target.value)}}
                                                /> 
                                            </label>
                                        }
                                    </div>
                                </div>  
                        </div>
                   </div>
                    
                   <div className="nev-input-select-row-bis"> 

                        <div className="nev-half-input-row" id="back-dark">
                            <div className="select-row-title">
                                <p>Estado</p>
                            </div>
                            <div className="selectors-field">
                                <div className="selector-wrapper">
                                    <Radio
                                        checked={this.state.state === 'despierto'}
                                        onChange={this.handleStateChange}
                                        value='despierto'
                                        name="radio-button-demo"
                                        aria-label="despierto"
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                    <div className="selector-text">
                                        <p>Despierto</p>
                                    </div>
                                </div>  
                                <div className="selector-wrapper">
                                    <Radio
                                        checked={this.state.state === 'dormido'}
                                        onChange={this.handleStateChange}
                                        value='dormido'
                                        name="radio-button-demo"
                                        aria-label="dormido"
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                    <div className="selector-text">
                                        <p>Durmiendo</p>
                                    </div>
                                </div>  
                            </div>
                        </div>
                   

                        <div className="nev-half-input-row" id="back-light2">

                            <div className="select-row-title">
                                <p>Intensidad</p>
                            </div>
                            
                            <div className="selectors-field">
                                <div className="selector-wrapper">
                                    <Radio
                                        checked={this.state.intensity === 'leve'}
                                        onChange={this. handleIntensityChange}
                                        value='leve'
                                        name="radio-button-demo"
                                        aria-label="leve"
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                    <div className="selector-text">
                                        <p>Leve</p>
                                    </div>
                                </div>  
                                <div className="selector-wrapper">
                                    <Radio
                                        checked={this.state.intensity === 'moderado'}
                                        onChange={this. handleIntensityChange}
                                        value='moderado'
                                        name="radio-button-demo"
                                        aria-label="moderado"
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                    <div className="selector-text">
                                        <p>Moderado</p>
                                    </div>
                                </div>  
                                <div className="selector-wrapper">
                                    <Radio
                                        checked={this.state.intensity === 'intenso'}
                                        onChange={this. handleIntensityChange}
                                        value='intenso'
                                        name="radio-button-demo"
                                        aria-label="intenso"
                                        classes={{
                                            root: classes.root,
                                            checked: classes.checked,
                                        }}
                                    />
                                    <div className="selector-text">
                                        <p>Intenso</p>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    
                    </div>
                        
                    <div className="nev-textarea-row">


                        <label className="nev-textarea-label">
                            <p>Observación Clínica</p>
                            <textarea className="nev-textarea"
                                name="Observación"
                                value={this.state.clinicObservation}
                                onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}
                            /> 
                        </label>

                        <label className="nev-textarea-label">
                            <p>Acción</p>
                            <textarea className="nev-textarea"
                                name="Acción"
                                value={this.state.action}
                                onChange={(e)=>{this.onChangeState('action', e.target.value)}}
                            /> 
                        </label>

                        <div className="nev-docs-row">

                            <CustomDropZone 
                                onFileUpload={(fileUrl)=>{this.onChangeState('eventPics', fileUrl)}}
                                acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                                uploadFolder={`patientID:${this.state.patientId}/${this.state.eventCode}`}
                                name="Imágenes / Videos"
                                background="white"
                                text="Arrastra tus archivos hasta aquí"
                            />  

                            </div>
                    
                    </div>

                </div>

                <div className="nev-button-area">
                   <SubmitButton text={'GUARDAR'}/>
                </div>
           
            </form>
        </div>
    );
  }
}

EventInput.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(EventInput);





// CAMPOS ANTERIORES

// <label className="label-short">
// <p>Saturación mínima [%]</p>
// <input className="input-short" type="text" name="Saturaciín Mínima"
//     value={this.state.minSaturation}
//     onChange={(e)=>{this.onChangeState('minSaturation', e.target.value)}}
// /> 
// </label>


// <label className="label-short">
// <p>Fiebre [ºC]</p>
// <input className="input-short" type="text" name="Fiebre"
//     value={this.state.fever}
//     onChange={(e)=>{this.onChangeState('fever', e.target.value)}}
// /> 
// </label>

// </div>

// <div className="nev-textarea-row">

// <label className="nev-textarea-label">
// <p>Detonante</p>
// <textarea className="nev-textarea"
//     name="Detonante"
//     value={this.state.detonation}
//     onChange={(e)=>{this.onChangeState('detonation', e.target.value)}}
// /> 
// </label>