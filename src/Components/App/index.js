import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


// API SERVICES
import DataService from '../services/DataService';

// COMPONENTS
import Login from '../Access/Login';
import Register from '../Access/Register';
import Header from '../Header';
import Home from '../Home';
import Patient from '../Patient';
import AddPatient from '../AddPatient';
import NewReading from '../ReadingInput';

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
  storageBucket: "",
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

        DataService.getUserInfo(user.uid)
        .then(result => {
          this.setState({user : result});
          console.log('el user en App', this.state.user);
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
    console.log(this.state.user);
    return (
      <div>

        <Router>

          <div className="app">
          
            <div className="app-header">
              <Header user={user} />}
            </div>
        
            <div className="app-body">

              <Switch>
                <Route path="/login" render = {(props) => {return <Login propsFn={props.history}/>}}/>
                <Route path="/register" render = {(props) => {return <Register propsFn={props.history}/>}}/> 

                <Route path="/home/:user" render = {(props) => { return <Home userID={props.match.params.user}/>}}/>
                <Route path="/add_patient/:user" render = {(props) => { return <AddPatient propsFn={props.history} userID={props.match.params.user}/>}}/>

                <Route path="/patient/:patientId" render = {(props) => { return <Patient propsFn={props.history} patID={props.match.params.patientId} />}}/>
                <Route path="/patient_new_reading/:patientId" render = {(props) => { return <NewReading propsFn={props.history} patID={props.match.params.patientId} />}}/>
              </Switch>


            </div>

          </div>

        </Router>
        
      </div>
    );
  }
}

export default App;
