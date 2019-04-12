import React, { Component } from 'react';

// MOMENT
import moment from 'moment';

// SERVICE API
import DataService from '../../services/DataService';
import Calculations from '../../services/Calculations';

// Components
import EChartBars from '../../Accessories/Charts/EChartsBars';
// CSS
import './index.css';

export default class EventsGraphic extends Component {
  constructor(props){
    super(props);

    this.state = {
      patientId         : this.props.patID,
      patientsEvents    : [],
      eventsSorted      : [],
      firstEventDate    : '',
      lastEventDate     : '',
      timeLineDays      : '',
      xData             : [],

    }
  }

  componentDidMount(){

    DataService.getPatientsEvents(this.state.patientId)
    .then(res => {
      const evts      = res;
      let eSorted     = Calculations.sortByDateAsc(evts);
      let evLe        = eSorted.length;
      let fEventDate  = new Date(eSorted[0].date);
      let lEventDate  = new Date(eSorted[evLe-1].date);
      // let today       = new Date();
      let time        = ((((lEventDate - fEventDate)/1000)/60)/60)/24;

      if ( time > 240) {
        this.setState({
          eventsSorted  : eSorted,
          lastEventDate : lEventDate,
          timeLineDays  : 240,
        })
      } else {
        this.setState({ 
          eventsSorted  : eSorted,
          lastEventDate : lEventDate,
          timeLineDays  : time,
        });
      }

      this._cristiamFn(eSorted);
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  
  
  _cristiamFn(events){

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

    this.setState({
      xD : resultDates,
      sD : resultEvents,
    });

  };
  
  
  render() {

    return (
    
      <div className="events-chart" to={`/events-overview/${this.state.patientId}`}>

        {this.state.xData === [] ? <p>LOADING !</p> : 
        
          <div>
            <EChartBars 
              xData={this.state.xD} 
              sData={this.state.sD}
              dZ = {false}   // hide Zoomer
              sName = {'Eventos'}
              h = {'225px'}
              w = {'450px'}
              tB = {['none']}
              bW = {'40%'}
              zoom = {false}
            />
          </div>
        }

      </div>
         

    );
  };
};

