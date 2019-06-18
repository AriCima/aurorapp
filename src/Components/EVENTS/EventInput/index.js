import React from "react";

// SERVICE API
import DataService from "../../services/DataService";
import CustomDropZone from "../../CustomDropZone";

// MATERIAL UI
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";

//ACCESORIES
import SubmitButton from "../../Accessories/SubmitButton";
import SelectCreate from '../../Accessories/SelectCreate';

// CSS
import "./index.css";

const styles = {
  root: {
    color: "rgba(0, 144, 248, 1)",
    "&$checked": {
      color: "rgba(0, 144, 248, 1)"
    }
  },
  checked: {
    color: "rgba(0, 144, 248, 1)",
    "&$checked": {
      color: "rgba(0, 144, 248, 1)"
    }
  }
};

const crisisTypes = [
  {
    label: "De Ausencia",
    value: "De Ausencia",
    visible: true
  },
  { label: "Focal", value: "Focal", visible: true },
  { label: "Mioclónica", value: "Mioclónica", visible: true },
  { label: "Tónica-clónica", value: "Tónica-clónica", visible: true },
  { label: "Atónica", value: "Tónica-clónica", visible: true }
];
const detoTypes = [
  {
    label: "Sueño Escaso",
    value: "Sueño escaso",
    visible: true
  },
  {
    label: "Posible estrés",
    value: "Posible estrés",
    visible: true
  },
  {
    label: "Cambio Temp ambiente",
    value: "Cambio Temp ambiente",
    visible: true
  },
  {
    label: "Estímulo luminoso",
    value: "Estímulo luminoso",
    visible: true
  },
  {
    label: "Fiebre",
    value: "Fiebre",
    visible: true
  }
];
const intensityTypes = [
  {
    label: "Leve",
    value: "Leve",
    visible: true
  },
  {
    label: "Moderado",
    value: "Moderado",
    visible: true
  },
  {
    label: "Intenso",
    value: "Intenso",
    visible: true
  }
];
const stateTypes = [
  {
    label: "Despierto",
    value: "Despierta/o",
    visible: true
  },
  {
    label: "Durmiento",
    value: "Durmiendo",
    visible: true
  }
];

class EventInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patID,
      date: "",
      startTime: "",
      duration: "",

      inputType: "",
      inputOwnType: "",
      typesValues: [],
      allTypes: [],
      typeLabels: [],

      inputDetonation: "",
      inputOwnDetonation: "",
      detosValues: [],
      allDetos: [],
      detosLablels: [],

      state: "",
      intensity: "",
      clinicObservation: "",
      action: "",
      patientsEvents: []
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.onNewEvent = this.onNewEvent.bind(this);

    this.onChangeState = this.onChangeState.bind(this);

    // this.handleStateChange = this.handleStateChange.bind(this);
    // this.handleIntensityChange = this.handleIntensityChange.bind(this);
  }

  componentDidMount() {
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      let tLabels = [];
      let indexT = tLabels.length;
      let dLabels = [];
      let indexD = dLabels.length;

      for (let j = 0; j < indexT; j++){
        tLabels.push(pat.ownEventTypes[j].toUpperCase())
      }

      for (let j = 0; j < indexD; j++){
        dLabels.push(pat.ownDetonations[j].toUpperCase())
      }

      this.setState({
        patientsEvents  : pat.patientsEvents,
        typesLabels     : tLabels,  
        detosLabels     : dLabels,
        allTypes        : pat.ownEventTypes,
        allDetos        : pat.ownDetonations
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

  onChangeState(field, value) {
    
    let eventInfo = this.state;
    eventInfo[field] = value;
    this.setState(eventInfo);
  }
  // handleStateChange = event => {
  //   this.setState({ state: event.target.value });
  // };
  // handleIntensityChange = event => {
  //   this.setState({ intensity: event.target.value });
  // };

  onNewEvent(e) {
    e.preventDefault();
    let patID = this.props.patID;
    let eventType = '';
    let eventDeto = '';

    // EN CASO QUE EL TIPO DE EVENTO SEA "Otra"
    if(this.state.inputType === "Otra" ){
      let oType     = this.state.inputOwnType.toUpperCase();
      let allTypes  = this.state.allTypes;
      let types     = this.state.typesLabels;

      // SI ES NUEVO => ACTUALIZO BASE DE DATOS
      if (types.indexOf(oType) < 0) {
        if (allTypes.length === []) {
          allTypes[0] = { label: oType, value: oType};   // this is the structure needed for the SelecBar props
        } else {
          allTypes.push({label: oType, value: oType});
        };

        DataService.updateEventTypes(patID, allTypes)
          .then(result => {
            console.log(" event succesfully updated !!!");
          })
          .catch(function(error) {
            console.log(error);
          });
      }

      // GUARDO EVENTO CON EL OWN TYPE
      eventType = this.state.inputOwnType.toUpperCase();
    } else {
      // GUARDO EVENTO CON EL TIPO STANDARD
      eventType = this.state.inputType;
    };
    
    // EN CASO QUE EL TIPO DE DETONACION SEA "Otra"
    if(this.state.inputDetonation === "Otra"){
      let oDet = this.state.inputOwnDetonation.toUpperCase();
      let allDetos= this.state.allDetos;
      let detos = this.state.detosLabels;

      // SI ES NUEVO => ACTUALIZO BASE DE DATOS
      if (detos.indexOf(oDet) < 0) {
        if (allDetos.lenght === []) {
          allDetos[0] = {label: oDet, value: oDet};  // this is the structure needed for the SelecBar props
        } else {
          allDetos.push({ label: oDet, value: oDet });
        }

        DataService.updateEventDetonations(patID, allDetos)
        .then(result => {
          console.log(" detonation succesfully updated !!!");
        })
        .catch(function(error) {
          console.log(error);
        });
      }

      // GUARDO EVENTO CON EL OWN DETONATION
      eventDeto = this.state.inputOwnDetonation.toUpperCase();
    } else {
      eventDeto = this.state.inputDetonation;
    };

    let newEvent = {
      patientId         : patID,
      date              : this.state.date,
      startTime         : this.state.startTime,
      duration          : this.state.duration,
      type              : eventType,
      clinicObservation : this.state.clinicObservation,
      detonation        : eventDeto,
      intensity         : this.state.intensity,
      state             : this.state.state,
      action            : this.state.action
    };
    
    // DataService.newEvent(newEvent)
    // .then(result => {
    //   console.log(result.id, " event succesfully registered !!!");
    //   this.props.propsFn.push(`/patient/${this.state.patientId}`);
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });

    DataService.newEventSub(newEvent, patID)
    .then(result => {
      console.log(result.id, " event succesfully registered !!!");
      this.props.propsFn.push(`/patient/${this.state.patientId}`);
    })
    .catch(function(error) {
      console.log(error);
    });

    this.props.propsFn.push(`/patient/${this.state.patientId}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="nev-form-container">
        <div className="nev-form-title">
          <h2>Nuevo Evento</h2>
        </div>

        <form id="nev-form-format" onSubmit={this.onNewEvent}>
          <div id="nev-input-area">
            <div className="nev-input-row" id="back-light">
              <label className="label-date">
                <p>Fecha</p>
                <input
                  className="input-date"
                  size="150"
                  type="date"
                  value={this.state.date}
                  onChange={e => {
                    this.onChangeState("date", e.target.value);
                  }}
                />
              </label>

              <label className="label-short">
                <p>Comienzo [Hr:mm]</p>
                <input
                  className="input-short"
                  type="text"
                  name="Comienzo"
                  size="150"
                  value={this.state.startTime}
                  onChange={e => {
                    this.onChangeState("startTime", e.target.value);
                  }}
                />
              </label>

              <label className="label-short">
                <p>Duración [min]</p>
                <input
                  className="input-short"
                  type="text"
                  name="Duración"
                  value={this.state.duration}
                  onChange={e => {
                    this.onChangeState("duration", e.target.value);
                  }}
                />
              </label>
            </div>

            <div className="nev-input-select-row" id="type">
              <div className="select-row-title">
                <p>Tipo de crisis</p>
              </div>
              <div className="selectors-field">
                
                {this.props.crisisTypes.map(crisis => (
                  <div className="selector-wrapper">
                    <Radio
                      checked={this.state.inputType === crisis.value}
                      onChange={e =>
                        this.handleSelection({
                          field: "inputType",
                          value: crisis.value
                        })
                      }
                      value={crisis.value}
                      name="radio-button-demo"
                      aria-label="b"
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}
                    />
                    <div className="selector-text">
                      <p>{crisis.label}</p>
                    </div>
                  </div>
                ))}

                <div className="selector-wrapper">
                  <Radio
                    checked={this.state.inputType === "Otra"}
                    onChange={e =>
                      this.handleSelection({
                        field: "inputType",
                        value: "Otra"
                      })
                    }
                    name="radio-button-demo"
                    aria-label="Otra"
                    classes={{
                      root: classes.root,
                      checked: classes.checked
                    }}
                  />
                  <div className="selector-text">
                    <p>Otra</p>
                  </div>
                </div>

                <div className="selector-wrapper-bar">
                  {this.state.inputType === "Otra" && 
                    (<SelectCreate 
                      options={this.state.allTypes} 
                      field={'inputOwnType'}
                      fn={this.handleSelection}
                      />
                    )
                  }
                </div>
                
              </div>
            </div>

            <div className="nev-input-select-row" id="deto">

              <div className="select-row-title">
                <p>Detonante</p>
              </div>

              <div className="selectors-field">

                {this.props.detoTypes.map(deto => (
                  <div className="selector-wrapper">
                    <Radio
                      checked={this.state.inputDetonation === deto.value}
                      onChange={e =>
                        this.handleSelection({
                          field: "inputDetonation",
                          value: deto.value
                        })
                      }
                      value={deto.value}
                      name="radio-button-demo"
                      aria-label="b"
                      classes={{
                        root: classes.root,
                        checked: classes.checked
                      }}
                    />
                    <div className="selector-text">
                      <p>{deto.label}</p>
                    </div>
                  </div>
                ))}

                <div className="selector-wrapper">
                  <Radio
                    checked={this.state.inputDetonation === "Otra"}
                    onChange={e =>
                      this.handleSelection({
                        field: "inputDetonation",
                        value: "Otra"
                      })
                    }
                    value="Otra"
                    name="radio-button-demo"
                    aria-label="Otra"
                    classes={{
                      root: classes.root,
                      checked: classes.checked
                    }}
                  />
                  <div className="selector-text">
                    <p>Otra</p>
                  </div>
                </div>
                <div className="selector-wrapper-bar">
                  {this.state.inputDetonation === "Otra" && 
                    (<SelectCreate options={this.state.allDetos} field={'inputOwnDetonation'}fn={this.handleSelection}/>)
                  }
                </div>
                
              </div>
            </div>

            <div className="nev-input-select-row-bis">
              <div className="nev-half-input-row" id="type">
                <div className="select-row-title">
                  <p>Estado</p>
                </div>
                <div className="selectors-field">
                  {this.props.stateTypes.map(state => (
                    <div className="selector-wrapper">
                      <Radio
                        checked={this.state.state === state.value}
                        onChange={e =>
                          this.handleSelection({
                            field: "state",
                            value: state.value
                          })
                        }
                        value={state.value}
                        name="radio-button-demo"
                        aria-label="b"
                        classes={{
                          root: classes.root,
                          checked: classes.checked
                        }}
                      />
                      <div className="selector-text">
                        <p>{state.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nev-half-input-row" id="intensity">
                <div className="select-row-title">
                  <p>Intensidad</p>
                </div>
                <div className="selectors-field">
                  {this.props.intensityTypes.map(intens => (
                    <div className="selector-wrapper">
                      <Radio
                        checked={this.state.intensity === intens.value}
                        onChange={e =>
                          this.handleSelection({
                            field: "intensity",
                            value: intens.value
                          })
                        }
                        value={intens.value}
                        name="radio-button-demo"
                        aria-label="b"
                        classes={{
                          root: classes.root,
                          checked: classes.checked
                        }}
                      />
                      <div className="selector-text">
                        <p>{intens.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="nev-textarea-row">

              <label className="nev-textarea-label">
                <p>Observación Clínica</p>
                <textarea
                  className="nev-textarea"
                  name="Observación"
                  value={this.state.clinicObservation}
                  onChange={e => {
                    this.onChangeState("clinicObservation", e.target.value);
                  }}
                />
              </label>

              <label className="nev-textarea-label">
                <p>Acción</p>
                <textarea
                  className="nev-textarea"
                  name="Acción"
                  value={this.state.action}
                  onChange={e => {
                    this.onChangeState("action", e.target.value);
                  }}
                />
              </label>

              <div className="nev-docs-row">

                <CustomDropZone
                  onFileUpload={fileUrl => {
                    this.onChangeState("eventPics", fileUrl);
                  }}
                  acceptedFiles="image/jpeg, image/png, video/mp4, video/mpeg"
                  uploadFolder={`patientID:${this.state.patientId}/${
                    this.state.eventCode
                  }`}
                  name="Imágenes / Videos"
                  background="white"
                  text="Arrastra tus archivos hasta aquí"
                />

              </div>

              <div className="nev-docs-row">
                <input 
                  type="file" 
                  ref={ref => this.imageInput = ref} 
                />
              </div>

            </div>
          </div>

          <div className="nev-button-area">
            <SubmitButton text={"GUARDAR"} fn={this.onNewEvent}/>
          </div>
        </form>
      </div>
    );
  }
}

EventInput.defaultProps = {
  crisisTypes,
  detoTypes,
  stateTypes,
  intensityTypes
}; // añade a las props de EventInput los tipos de crisis (lo hace más dinámico)

EventInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventInput);
