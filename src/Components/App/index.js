import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import Header from '../Header';
import HeaderPatient from '../HeaderPatient';
import HeaderEventInput from '../HeaderEventInput';
import HeaderReadingInput from '../HeaderReadingInput';

import Login from '../Access/Login';
import Register from '../Access/Register';
import Home from '../Home';
import Patient from '../Patient';
import PatientInput from '../PatientInput';
import FirstEvent from '../EventFirst';
import EventFirstHeader from '../EventFirstHeader';
import WeightInput from '../WeightInput';
import EventInput from '../EventInput';
import MedicineInput from '../MedicineInput';
import EventOverview from '../EventOverview';
import MedicineOverview from '../MedicineOverview';

// CSS
import './index.css';

// FIREBASE
import * as firebase from 'firebase';


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


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user  : null,
    }
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log()
        DataService.getUserInfo(user.uid)
        .then(result => {
          result.id = user.uid;
          
          this.setState({
            user: result
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
    const { user } = this.state;
    //console.log('el user en APP', user)
    return (
      <div>

        <Router>

          <div className="app">
          
            <div className="app-header">
              <Switch>
                <Route path="/home/:user"  render = {(props) => { return  <Header user={user} />}}/>
                <Route path="/patient/:patientId" exact render = {(props) => { return <HeaderPatient propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/first-event/:patientId" exact render = {(props) => { return <EventFirstHeader propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <HeaderEventInput propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/patient_new_reading/:patientId" exact render = {(props) => { return <HeaderReadingInput propsFn={props.history} patID={props.match.params.patientId} />}}/> */}
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <HeaderReadingInput propsFn={props.history} patID={props.match.params.patientId} />}}/> */}


                {/* <Route path="/add_patient/:user" exact render = {(props) => { return <HeaderPatientInput propsFn={props.history} userID={props.match.params.user}/>}}/>

                {/* <Header user={user} /> */}
              </Switch>
            </div>
        
            <div className="app-body">

              <Switch>
                <Route path="/" exact render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 

                <Route path="/home/:user" render = {(props) => { return <Home userID={props.match.params.user}/>}}/>
                <Route path="/add_patient/:user" exact render = {(props) => { return <PatientInput propsFn={props.history} userID={props.match.params.user}/>}}/>
                <Route path="/first-event/:patientId" exact render = {(props) => { return <FirstEvent propsFn={props.history} patID={props.match.params.patientId}/>}}/>
                <Route path="/new_event_register/:patientId" exact render = {(props) => { return <EventInput propsFn={props.history} patID={props.match.params.patientId} userID={props.match.params.user}/>}}/>
                <Route path="/single_event_overview/:eventId" exact render = {(props) => { return <EventOverview propsFn={props.history} eventID={props.match.params.eventtId} userID={props.match.params.user}/>}}/>

                <Route path="/patient/:patientId" exact render = {(props) => { return <Patient propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/patient_new_reading/:patientId" exact render = {(props) => { return <WeightInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/patient_new_medicine/:patientId" exact render = {(props) => { return <MedicineInput propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/medicine_overview/:patientId" exact render = {(props) => { return <MedicineOverview propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/single_medicine_overview/:patientId/:drugName" exact render = {(props) => { return <MedicineOverview propsFn={props.history} patID={props.match.params.patientId} dName={props.match.params.drugName} />}}/>

              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
