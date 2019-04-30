import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import Header from '../Header';
import HeaderGral from '../HeaderGral';
import HeaderLanding from '../HeaderLanding';
import HeaderEventFirst from '../HeaderEventFirst';
import POverview from '../HEADERS/POverview';

import Login from '../Access/Login';
import Register from '../Access/Register';
import Home from '../Home';
import Landing from '../A-Landing';

import Patient from '../Patient';
import PatientInput from '../PatientInput';
import PatientOverview from '../PatientOverview';
import Patients1 from '../PATIENTS';

import EvOverview from '../EVENTS/EvOverview';
import SingleEvent from '../EventSingle';
import FirstEvent from '../EventFirst';
import EventInput from '../EventInput';

import WeightInput from '../WeightInput';
import WeightOverview from '../WEIGHT/WeightOverview';

import MedicineInput from '../MedicineInput';
import MedicineOverview from '../MedicineOverview';
import SingleMedOverview from '../Medicines/SingleMedOverview';

// CSS
import './index.css';

// FIREBASE
import * as firebase from 'firebase';


// FONTAWSOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faAngleDown, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown, faAngleDown, faInfoCircle)

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBOHIkUgOxaz1XTpwKgt1FfHg5eyOrLyps",
//   authDomain: "aurorapp-3a992.firebaseapp.com",
//   databaseURL: "https://aurorapp-3a992.firebaseio.com",
//   projectId: "aurorapp-3a992",
//   storageBucket: "gs://aurorapp-3a992.appspot.com",
//   messagingSenderId: "590608251480"
// };
// firebase.initializeApp(config);

// const firestore = firebase.firestore();
// const settings = {timestampsInSnapshots: true};
// firestore.settings(settings);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user    : null,
      userId  : '',
      userName: '',
    }
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log()
        DataService.getUserInfo(user.uid)
        .then(result => {

          // console.log('result en APP = ', result)
          result.id = user.uid;
          // console.log('result.id', result.id)
          this.setState({
            user      : result,
            userId    : result.id,
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
      }
    });
    
  }

  render() {
    // const { user } = this.state;
    return (
      <div>

        <Router>

          <div className="app">
          
             {/* * * * * * * HEADERS * * * * * * */}
            <div className="app-header">  
            
              <Switch>

                <Route path="/"  exact render = {() => { return  <HeaderLanding/>}}/>
                <Route path="/home/:userId"  render = {(props) => { return  <Header userID={props.match.params.userId} uName={this.state.userName}/>}}/>
      
                {/* * * *  PATIENT * * * */}
                {/* <Route path="/patient/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/> */}
                <Route path="/patient/:patientId" exact render = {(props) => { return <POverview propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/single-patient-overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/add_patient/:user" exact render = {(props) => { return <Header propsFn={props.history} uName={this.state.userName}/>}}/>

                {/* * * *  EVENT * * * */}
                <Route path="/events-overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/first-event/:patientId" exact render = {(props) => { return <HeaderEventFirst propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/single_event_overview/:patId/:eventId" exact render = {(props) => { return <HeaderGral propsFn={props.history} eventID={props.match.params.eventId} patID={props.match.params.patId}/>}}/>
 
                {/* * * *  WEIGHT * * * */}
                <Route path="/patient_new_weight/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/weight_overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 

                {/* * * *  MEDICINES * * * */}
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/medicine_overview/:patientId" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/> 
                <Route path="/single_medicine_overview/:patientId/:drugName/:dUnit/:dDose" exact render = {(props) => { return <HeaderGral propsFn={props.history} patID={props.match.params.patientId} />}}/>

              </Switch>

            </div>
        
            {/* * * * * * * BODY * * * * * * */}
            <div className="app-body">

              <Switch>
                <Route path="/" exact render = {() => {return <Landing/>}}/>
                <Route path="/login" exact render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 
                
                {/* * * *  PATIENT * * * */}
                <Route path="/home/:user" render = {(props) => { return <Home userID={props.match.params.user}/>}}/>
                {/* <Route path="/patient/:patientId" exact render = {(props) => { return <Patient propsFn={props.history} patID={props.match.params.patientId} />}}/> */}
                <Route path="/patient/:patientId" exact render = {(props) => { return <Patients1 propsFn={props.history} patID={props.match.params.patientId} />}}/>

                <Route path="/single-patient-overview/:patientId" exact render = {(props) => { return <PatientOverview propsFn={props.history} userID={this.state.userId} patID={props.match.params.patientId}/>}}/>
                <Route path="/add_patient/:user" exact render = {(props) => { return <PatientInput propsFn={props.history} userID={props.match.params.user}/>}}/>
                
                {/* * * *  EVENTS * * * */}
                <Route path="/first-event/:patientId" exact render = {(props) => { return <FirstEvent propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/events-overview/:patientId" exact render = {(props) => { return <EvOverview propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <EventInput propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/single_event_overview/:patId/:eventId" exact render = {(props) => { return <SingleEvent propsFn={props.history} eventID={props.match.params.eventId} patID={props.match.params.patId}/>}}/>
                
                {/* * * *  WEIGHT * * * */}
                <Route path="/patient_new_weight/:patientId" exact render = {(props) => { return <WeightInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/weight_overview/:patientId" exact render = {(props) => { return <WeightOverview propsFn={props.history} patID={props.match.params.patientId}/>}}/>

                {/* * * *  MEDICINES * * * */}
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <MedicineInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/medicine_overview/:patientId" exact render = {(props) => { return <MedicineOverview propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/single_medicine_overview/:patientId/:drugName/:dUnit/:dDose" exact render = {(props) => { return <SingleMedOverview propsFn={props.history} patID={props.match.params.patientId} dName={props.match.params.drugName} dUnits={props.match.params.dUnit} dose={props.match.params.dDose}/>}}/>

              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
