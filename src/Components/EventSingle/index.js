import React from 'react';

// SERVICE API
import DataService from '../services/DataService';

import CustomDropZone from '../CustomDropZone';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

//ACCESORIES
import SubmitButton from '../Accessories/SubmitButton';
import EditButton from '../Accessories/EditButton';

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

class SingleEvent extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            eventId             : this.props.eventID,
            patientId           : this.props.patID,
            patientsEvents      : [],

            date                : '',
            startTime           : '',
            duration            : '',

            type                : '',
            ownType             : '', // en el caso que se indique otro tipo
            ownTypes            : {}, // todos los tipos propios de evento

            state               : '',
            intensity           : '',

            detonation          : '',
            ownDetonation       : '',
            ownDetonations      : {},

            clinicObservation   : '',
            action              : '',
        };

        this.onUpdateEvent          = this.onUpdateEvent.bind(this);
        this.onChangeState          = this.onChangeState.bind(this);
        this.handleTypeChange       = this.handleTypeChange.bind(this);
        this.handleDetonationChange = this.handleDetonationChange.bind(this);
        this.handleStateChange      = this.handleStateChange.bind(this);
        this.handleIntensityChange  = this.handleIntensityChange.bind(this);

        // this.onEditType = this.onEditType.bind(this);

    }

    componentDidMount(){
       console.log('comp launched')
        let patID = this.props.patID;
        let eventID = this.props.eventID;

        DataService.getEventInfo(eventID)
        .then(res => {

            this.setState({ 
                date                : res.date,
                startTime           : res.startTime,
                duration            : res.duration,
                type                : res.type,
                ownType             : res.ownType,       
                state               : res.state,        
                intensity           : res.intensity,          
                detonation          : res.detonation,
                ownDetonation       : res.ownDetonation,
                clinicObservation   : res.clinicObservation,
                action              : res.action,
            });
           
        })
        .catch(function (error) {    
        console.log(error);
        }) 

        DataService.getEventOwnType(patID)
        .then(res => {
            console.log('event Type recieved = ', res.ownTypes)

            this.setState({
                ownTypes : res.ownTypes,
            })
        })
        .catch(function (error) {    
            console.log(error);
        }) 

        DataService.getOwnDetonations(patID)
        .then(res => {
            console.log('Detonation recived ', res.ownDetonations)
            this.setState({
                ownDetonations : res.ownDetonations,
            })
        })
        .catch(function (error) {    
            console.log(error);
        }) 
  
    }

    onChangeState(field, value){
        console.log('changing field ', field, ' / ', ' with value: ', value )
        let aptInfo = this.state;
        aptInfo[field] = value;
        this.setState(aptInfo)
    };

    handleTypeChange = event => {
        console.log('Type change')
        this.setState({ type: event.target.value });
    };
    handleDetonationChange = event => {
        console.log('Detonation change')
        this.setState({ detonation: event.target.value });
    };
    handleStateChange = event => {
        console.log('State change')
        this.setState({ state: event.target.value });
    };
    handleIntensityChange = event => {
        console.log('Intensity')
        this.setState({ intensity: event.target.value });
    };

    onUpdateEvent(e){
        e.preventDefault();         
        let eventID =this.props.eventID;
        
        let editedEvent = {
            patientId           : this.props.patID,
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

        DataService.updateEventInfo(eventID, editedEvent)
        .then((result) => {
           
            console.log(result.id, ' event succesfully edited !!!')
            
            let patID = this.state.patientId;
            let oType = this.state.ownType;
            let types = [...this.state.ownTypes];
            let oDet  = this.state.ownDetonation;
            let detos = [...this.state.ownDetonations];

            if(types.ownTypes.indexOf(oType) < 0){
                types.ownTypes.push(oType);

                DataService.updateOwnEventTypes(patID, types).then(
                    console.log('Own Event Types updated ! ! ! ')
                )
            };

            if(detos.ownDetonations.indexOf(oDet) < 0){
                detos.ownDetonations.push(oDet);

                DataService.updateOwnEventDetonations(patID, detos).then(
                    console.log('Own Detonations updated ! ! ! ')
                )
            }

        })
        .catch(function (error) {    
            console.log(error);
        })



        this.props.propsFn.push(`/events-overview/${this.state.patientId}`)
        
    };

    render() {
        const { classes } = this.props;
        return (
    
            <div className="sev-form-container">
    
                <div className="sev-form-title">
                    <h2>Información del evento</h2>
                </div>
    
                <form  id="sev-form-format" onSubmit={this.onUpdateEvent}>
                
                    <div id="sev-input-area">
    
                        <div className="sev-input-row" id="back-light">
                        
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
    
                        <div className="sev-input-select-row" id="back-dark">  
    
                            <div className="sev-select-row-title">

                                <div className="sev-select-row-title-left">
                                    <div>
                                        <p>Tipo de crisis:</p>
                                    </div>

                                </div>


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
                                                    value={this.state.ownType}
                                                    onChange={(e)=>{this.onChangeState('ownType', e.target.value)}}
                                                /> 
                                            </label>
                                        }
                                    </div>
                                </div>  
                            </div>
                            {/* } */}
                        </div>
    
                        <div className="sev-input-select-row" id="back-light">  
    
                            <div className="select-row-title">
                                <div className="sev-select-row-title-left">
                                        <div>
                                            <p>Detonante:</p>
                                        </div>
                                        {/* <div className="sev-title-text">
                                            <p>{this.state.detonation}</p>
                                        </div> */}
                                    </div>

                                    {/* <div className="sev-select-row-title-right">
                                        <div className="sev-title-button">
                                            <EditButton text={"Edit"} fn={this.onEditType}/>
                                        </div>
                                    </div> */}
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
                        
                        <div className="sev-input-select-row-bis"> 
    
                            <div className="nev-half-input-row" id="back-dark">
                                <div className="select-row-title">
                                <div className="sev-select-row-title-left">
                                    <div>
                                        <p>Estado:</p>
                                    </div>
                                    {/* <div className="sev-title-text">
                                        <p>{this.state.state}</p>
                                    </div> */}
                                </div>

                                {/* <div className="sev-select-row-title-right">
                                    <div className="sev-title-button">
                                        <EditButton text={"Edit"} fn={this.onEditType}/>
                                    </div>
                                </div> */}
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
                                <div className="sev-select-row-title-left">
                                    <div>
                                        <p>Intensidad:</p>
                                    </div>
                                    {/* <div className="sev-title-text">
                                        <p>{this.state.intensity}</p>
                                    </div> */}
                                </div>

                                {/* <div className="sev-select-row-title-right">
                                    <div className="sev-title-button">
                                        <EditButton text={"Edit"} fn={this.onEditType}/>
                                    </div>
                                </div> */}
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
                            
                        <div className="sev-textarea-row">
    
    
                            <label className="sev-textarea-label">
                                <p>Observación Clínica</p>
                                <textarea className="nev-textarea"
                                    name="Observación"
                                    value={this.state.clinicObservation}
                                    onChange={(e)=>{this.onChangeState('clinicObservation', e.target.value)}}
                                /> 
                            </label>
    
                            <label className="sev-textarea-label">
                                <p>Acción</p>
                                <textarea className="sev-textarea"
                                    name="Acción"
                                    value={this.state.action}
                                    onChange={(e)=>{this.onChangeState('action', e.target.value)}}
                                /> 
                            </label>
    
                            <div className="sev-docs-row">
    
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

SingleEvent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleEvent);