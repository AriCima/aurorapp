import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// SERVICE API
import DataService from "../../services/DataService";
import Calculations from "../../services/Calculations";

// MOMENT
import moment from 'moment';

// CHART
import EChartBars from '../../Accessories/Charts/EChartsBars';

// MATERIAL-UI
import AddButtonCool from "../../Accessories/AddButtonCool";

import "./index.css";

export default class EventsOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patID,
      patientsEvents: []
    };
    this._renderEventsInfo = this._renderEventsInfo.bind(this);
  }

  componentDidMount() {
    DataService.getPatientsEvents(this.state.patientId)
    .then(res => {
      const evts      = res;
      let eventsDesc  = Calculations.sortByDateDesc(evts);
      let eSorted     = Calculations.sortByDateAsc(evts);
      let evLe        = eSorted.length;
      let fEventDate  = new Date(eSorted[0].date);
      let lEventDate  = new Date(eSorted[evLe-1].date);
      let time        = ((((lEventDate - fEventDate)/1000)/60)/60)/24;

      if ( time > 240) {
        this.setState({
          eventsSorted  : eSorted,
          lastEventDate : lEventDate,
          timeLineDays  : 240,
          patientsEvents: eventsDesc,
        })
      } else {
        this.setState({ 
          eventsSorted  : eSorted,
          lastEventDate : lEventDate,
          timeLineDays  : time,
          patientsEvents: eventsDesc,
        });

      }

      this._cristiamFn(eSorted);
    })
    .catch(function (error) {    
      console.log(error);
    })    

    
  }


  _cristiamFn(events){
    console.log('time =', this.state.timeLineDays)
    // SE GRAFICAN LOS EVENTOS ENTRE LA FECHA DEL PRIMERO Y DEL ÚLTIMO.
    let resultEvents = [];
    let resultDates = [];
    let index = this.state.timeLineDays;

    let currentDate = new Date(this.state.lastEventDate);

    while (index >= 0) {
      
      let evQty = 0;
      let formatedCurrent = moment(currentDate).format('DD-MMM-YYYY');
      
      for (let j = 0; j < events.length; j++){
        let formatedEvent = moment(new Date(events[j].date)).format('DD-MMM-YYYY')

        if(formatedEvent === formatedCurrent ){
          evQty = evQty+1;
        } 
      }

      resultDates.unshift(moment(formatedCurrent).format('DD-MM'));
      resultEvents.unshift(evQty);
      
      currentDate.setDate(currentDate.getDate()-1);
      index--;
    }

    console.log('resultDates = ', resultDates)
    this.setState({
      xD : resultDates,
      sD : resultEvents,
    });

  };
  

  _renderEventsInfo() {
    return this.state.patientsEvents.map((evts, j) => {
      return (
        <div className="events-list-container">
          <Link
            className="event-standard-list-row"
            key={j}
            to={`/single_event_overview/${this.state.patientId}/${evts.id}`}
          >
            <div className="event-standard-list-info-block">
              <p>{evts.date}</p>
            </div>
            <div className="event-standard-list-info-block">
              <p>{evts.startTime}</p>
            </div>
            <div className="event-standard-list-info-block">
              <p>{evts.duration}</p>
            </div>
            <div className="event-standard-list-info-block">
              <p>{evts.type}</p>
            </div>
            <div className="event-standard-list-info-block">
              <p>{evts.intensity}</p>
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="events-area">

        <div className="events-upper">

          <div className="events-list-title">
            <h2>Eventos registrados</h2>
          </div>

          <div className="evt-add-button">
            <div>
              <Link to={`/new_event_register/${this.state.patientId}`}>
                <AddButtonCool text={"Nuevo Evento"} />
              </Link>
            </div>
          </div>

        </div>

        <div className="events-graphic-wrapper">
        
          <EChartBars 
            xData={this.state.xD} 
            sData={this.state.sD}
            dZ = {false}   // hide Zoomer
            sName = {'Eventos'}
            h = {'400px'}
            w = {'800px'}
            tB = {['none']}
            bW = {'40%'}
            zoom = {false}
          />

        </div>

        <div className="events-overview-list">

          <div className="standard-list-header">
            <ul>
              <li id="double-line">Fecha</li>
              <li id="double-line">
                Hora Inicio
                <br />
                hr:min
              </li>
              <li id="double-line">
                Duración
                <br />
                mins
              </li>
              <li id="double-line">
                Tipo
              </li>
              <li id="double-line">
                Intensidad
              </li>
            </ul>
          </div>

          <div className="events-fn-wrapper">
            {this.state.patientsEvents === [] ? (
              <p>LOADING !</p>
            ) : (
              this._renderEventsInfo()
            )}
          </div>
        
        </div>
      </div>
    );
  }
}
