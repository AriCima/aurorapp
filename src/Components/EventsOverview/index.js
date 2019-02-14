import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddButtonCool from '../Accessories/AddButtonCool';
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

class EventsOverview extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            patientId           : this.props.patID,
            patientsEvents      : [],
        };
    }

    componentDidMount(){	

        DataService.getPatientInfo(this.state.patientId)	
       .then(res => {

        let events = res.patientsEvents
    
        this.setState({ 	
        patientsEvents : events
        });	

        })	
       .catch(function (error) {    	
         console.log(error);	
       })    	
    }



  _renderEventsInfo(){ 
    
    return this.state.patientsEvents.map((evts,j) => {
      return (
        <div className="list-container">
          <Link className="standard-list-row" key={j} to={`/single_event_overview/${evts.eventId}`}> 
          
            <div className="standard-list-info-block">
               <p>{evts.date}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.startTime}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.duration}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.minSaturation}</p>
            </div>
            <div className="standard-list-info-block">
                <p>{evts.fever}</p>
            </div>
          </Link>
        </div>
      )
    })
  };
    

  
  render() {

    return (
          
        <div className="events-area">

            <div className="events-upper">
                <div className="events-list-title">
                <h2>Eventos registrados</h2>
                </div>
                
                <div className="med-add-button">
                    <div>
                        <Link to={`/patient_new_medicine/${this.state.patientId}`}><AddButtonCool text={'Nuevo Evento'}/></Link>
                    </div>
                </div>
            </div>

          <div className="standard-list-header">
            <ul>
              <li id="double-line">Fecha</li>
              <li id="double-line">Hora Inicio<br/>hr:min</li>
              <li id="double-line">Duración<br/>mins</li>
              <li id="double-line">Sat. mín. <br/>%</li>
              <li id="double-line">Temperatura <br/>ºC</li>
            </ul>
          </div>
          
            {this.state.patientName === '' ? <p>LOADING !</p> :
              this._renderEventsInfo()
            }   
         
        </div>

         



      
    );
  }
}

EventsOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventsOverview);