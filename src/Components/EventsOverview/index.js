import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';


// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

// MATERIAL-UI
import AddButtonCool from '../Accessories/AddButtonCool';

import './index.css'; 

export default class EventsOverview extends React.Component {
    constructor(props){
      super(props);
      this.state = { 
        patientId           : this.props.patID,
        patientsEvents      : [],
      };
      this._renderEventsInfo = this._renderEventsInfo.bind(this);
    }

    componentDidMount(){	

      DataService.getPatientsEvents(this.state.patientId)	
      .then(res => {
        
        let events = Calculations.sortByDateDesc(res);
        console.log('events', events);


        this.setState({ 	
          patientsEvents : events
        });	
        console.log('patientsEvents', this.state.patientsEvents)
      })	
      .catch(function (error) {    	
        console.log(error);	
      })    	
    }



  _renderEventsInfo(){ 
    
    return this.state.patientsEvents.map((evts,j) => {
      return (
        <div className="list-container">
          <Link className="standard-list-row" key={j} to={`/single_event_overview/${this.state.patientId}/${evts.id}`}> 
          
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
                        <Link to={`/new_event_register/${this.state.patientId}`}><AddButtonCool text={'Nuevo Evento'}/></Link>
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
          
            {this.state.patientsEvents === [] ? <p>LOADING !</p> :
              this._renderEventsInfo()
            }   
         
        </div>

         



      
    );
  }
}
