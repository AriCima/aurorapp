import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// AUX COMP
import Moment from 'react-moment'; // --> https://momentjs.com/
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// Components
import EChartBars from '../Cahrts/EChartsBars';

// CSS
import './index.css';

export default class EventsGraphic extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,

      patientsEvents    : [],
      eventsSorted      : [],
      firstEventDate    : '',

      timeLineDays      : 120,

      xData             : [],
    }
  }

  componentDidMount(){
 
    DataService.getPatientsEvents(this.state.patientId)
    .then(res => {
      const evts = res;

      let eSorted = Calculations.sortByDateAsc(evts);

      this.setState({ 
        eventsSorted : eSorted,
       });

    })
    .catch(function (error) {    
      console.log(error);
    })    
  }
  


  _eventsGraphicData(){

    let chartInfo = [];
    let pEvts = this.state.eventsSorted;
    let daysBack = this.state.timeLineDays;

    //Cálculo de la fecha inicial
    let today = new Date();

    let monthsBack = Number(daysBack)/30;

    let xData = [];
    let eL = pEvts.length;
    let serieData = [];

    for(let j = 0; j <= monthsBack; j++){
      // GENERAMOS ARRAYS DE MESES FROMATEADOS
      let monthToAdd = moment(today).subtract(monthsBack-j, 'M').format('MMM-YYYY');
      xData[j] = monthToAdd;
      serieData[j] = 0;

      // VERIFICAMOS SI LA FECHA DEL EVENTO FORMATEADA === MES FORMATEADO
      for (let k = 0; k < eL; k++){
        let eventDate = moment(new Date(pEvts[k].date)).format('MMM-YYYY');
        if ( xData[j] === eventDate){
          serieData[j] = serieData[j]+1;
        }
      }
    };

    chartInfo = [xData, serieData]

    return chartInfo

  }
  
  render() {

    let xD = this._eventsGraphicData()[0];  // cargarlos en el state para no hacer todos los cálculos con cada render
    let sD = this._eventsGraphicData()[1];

    return (

    
      <div className="events-chart" to={`/events-overview/${this.state.patientId}`}>

        {this.state.patientName === '' ? <p>LOADING !</p> : <div>
         
          <EChartBars patID={this.props.patID} xData={xD} sData={sD}/>
          </div>
        }

      </div>
         

    );
  };
};

