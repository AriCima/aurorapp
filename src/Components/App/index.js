import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import HeaderGral from '../HEADERS/HeaderGral';
import HeaderLanding from '../HEADERS/HeaderLanding';
import Login from '../Access/Login';
import Register from '../Access/Register';
import Home from '../Home';
import Landing from '../A-Landing';

// import Patient from '../Patient';
// import PatientInput from '../PATIENTS/PatInput';
// import PatientInfo from '../PATIENTS/PatInfoForm';
import PatientOverview from '../PATIENTS/PatOverview';

// import EvOverview from '../EVENTS/EvOverview';
// import SingleEvent from '../EventSingle';
// import FirstEvent from '../EventFirst';
import EventInput from '../EVENTS/EventInput';

// import WeightInput from '../WeightInput';
// import WeightOverview from '../WEIGHT/WeightOverview';

import MedicineInput from '../MEDICINES-1/MedicineInput';
// import MedicineOverview from '../MedicineOverview';
// import SingleMedOverview from '../Medicines/SingleMedOverview';

// CSS
import './index.css';

// FIREBASE
import * as firebase from 'firebase';


// FONTAWSOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faAngleDown, faInfoCircle)

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBOHIkUgOxaz1XTpwKgt1FfHg5eyOrLyps",
  authDomain: "aurorapp-3a992.firebaseapp.com",
  databaseURL: "https://aurorapp-3a992.firebaseio.com",
  projectId: "aurorapp-3a992",
  storageBucket: "gs://aurorapp-3a992.appspot.com",
  messagingSenderId: "590608251480"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user      : null,
      userID    : '',
      userName  : '',
      patID     : '',
      patInfo   : null,
    }
  }


  componentDidMount(){
    
    console.log('CDM triggered, patInfo = ', this.props.patInfo)

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user en App', user.uid)
        DataService.getUserInfo(user.uid)
        .then(result => {

          console.log('result en APP = ', result)
          result.id = user.uid;
          
          DataService.getPatientInfoALT(user.uid)
          .then(patient =>{
            console.log('patient en APP: ', patient);
            let patInfo = patient.patData;
            console.log('patInfo: ', patInfo);
            let patID = patient.patID;
            console.log('patID: ', patID);
            this.setState({
              patInfo   : patInfo,
              patID     : patID,
            });
          })

          this.setState({
            user      : result,
            userID    : result.id,
            userName  : result.name,
          });
        })
        .catch(function (error) {    
          console.log(error);
        })
      } else {
        this.setState({
          user : null
        });
      };
    });
    
  };

  componentDidUpdate(prevProps, prevState){
    if(prevProps.patInfo !== this.props.patInfo){
      console.log('IF triggered, patInfo = ', this.props.patInfo)
      this.setState({
        patInfo : this.props.patInfo,
      })
    };

    
  };



  render() {
    const { patInfo , patID, userID} = this.state;
    console.log('RENDER:')
    console.log('userID: ', userID);
    console.log('patID: ', patID);
    console.log('patInfo: ', patInfo);
    return (
      <div>

        <Router>

          <div className="app">
          {/* <div className="app-header">  
            
            <Switch>

              <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
              <Route path="/home/:userId"  render = {(props) => { return  <HeaderGral userID={props.match.params.userId} uName={this.state.userName}/>}}/>
              <Route path="/patient-overview/" exact render = {(props) => { return <HeaderGral propsFn={props.history}  patID={patID} patInfo={patInfo}/>}}/>
              <Route path="/event-input/" exact render = {(props) => { return <HeaderGral propsFn={props.history}  patInfo={patInfo}/>}}/>
              <Route path="/medicine-input/" exact render = {(props) => { return <HeaderGral propsFn={props.history}/>}}/> 


            </Switch>

          </div>  */}
            <Switch>
              <Route path="/"  exact render = {() => { return  <HeaderLanding patInfo={patInfo}/>}}/>
              <Route path="/home/:userId"  render = {(props) => { return  <HeaderGral propsFn={props.history}  patInfo={patInfo}/>}}/>
              <Route path="/" exact render = {() => {return <Landing/>}}/>
              <Route path="/login" exact render = {(props) => {return <Login propsFn={props.history}/>}}/>
              <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 

              <Route path="/patient-overview/" exact render = {(props) => { return <PatientOverview propsFn={props.history}  userID={userID} patID={patID} patInfo={patInfo}/>}}/>
              <Route path="/event-input/" exact render = {(props) => { return <EventInput propsFn={props.history}  patInfo={patInfo}/>}}/>

              <Route path="/medicine-input/:patientId" exact render = {(props) => { return <MedicineInput propsFn={props.history} userID={userID} patID={props.match.params.patientId}/>}}/> 


            </Switch>

            <div ref="ERASED LINES">
{/*         
            {/* * * * * * * HEADERS * * * * * * *
            <div className="app-header">  
            
              <Switch>

                <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
                <Route path="/home/:userId"  render = {(props) => { return  <HeaderGral userID={props.match.params.userId} uName={this.state.userName}/>}}/>
      
                * * * *  PATIENT * * * *
                * <Route path="/patient/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/> 
                <Route path='/patient-overview/' exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/patient-overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/> 
                <Route path="/single-patient-overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/add_patient/:user" exact render = {(props) => { return <HeaderGral propsFn={props.history} uName={this.state.userName}/>}}/>

                * * * *  EVENT * * * *
                <Route path="/events-overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/first-event/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/single_event_overview/:patId/:eventId" exact render = {(props) => { return <HeaderGral propsFn={props.history} eventID={props.match.params.eventId} patID={props.match.params.patId}/>}}/>
 
                {/* * * *  WEIGHT * * * *
                <Route path="/patient_new_weight/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/weight_overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 

                {/* * * *  MEDICINES * * * *
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/medicine_overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/single_medicine_overview/:patientId/:drugName/:dUnit/:dDose" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/>

              </Switch>

            </div> 
        
            * * * * * * * BODY * * * * * * *
            <div className="app-body">

              <Switch>
                <Route path="/" exact render = {() => {return <Landing/>}}/>
                <Route path="/login" exact render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 
                
                {/* * * *  PATIENT * * * *
                <Route path="/home/:user" render = {(props) => { return <Home userID={props.match.params.user}/>}}/>
                <Route path="/patient-overview/:patientId" exact render = {(props) => { return <PatientOverview propsFn={props.history} userID={this.state.userId} patID={props.match.params.patientId} />}}/>
                <Route path="/patient-info/:patientId" exact render = {(props) => { return <PatientInfo propsFn={props.history} userID={this.state.userId} patID={props.match.params.patientId}/>}}/>
                <Route path="/add_patient/:user" exact render = {(props) => { return <PatientInput propsFn={props.history} userID={props.match.params.user}/>}}/>
                
                {/* * * *  EVENTS * * * *
                <Route path="/first-event/:patientId" exact render = {(props) => { return <FirstEvent propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/events-overview/:patientId" exact render = {(props) => { return <EvOverview propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <EventInput propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/single_event_overview/:patId/:eventId" exact render = {(props) => { return <SingleEvent propsFn={props.history} eventID={props.match.params.eventId} patID={props.match.params.patId}/>}}/>
                
                {/* * * *  WEIGHT * * * *
                <Route path="/patient_new_weight/:patientId" exact render = {(props) => { return <WeightInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/weight_overview/:patientId" exact render = {(props) => { return <WeightOverview propsFn={props.history} patID={props.match.params.patientId}/>}}/>

                {/* * * *  MEDICINES * * * *
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <MedicineInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/medicine_overview/:patientId" exact render = {(props) => { return <MedicineOverview propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/single_medicine_overview/:patientId/:drugName/:dUnit/:dDose" exact render = {(props) => { return <SingleMedOverview propsFn={props.history} patID={props.match.params.patientId} dName={props.match.params.drugName} dUnits={props.match.params.dUnit} dose={props.match.params.dDose}/>}}/>

              </Switch>


            </div> */}

            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
