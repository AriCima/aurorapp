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
      user              : this.props.userID,
      patientId         : this.props.patID,

      patientsEvents    : this.props.events,
      eventsSorted      : [],
      firstEventDate    : '',

      timeLineDays      : 60,

      xData             : [],
    }
  }
 
  // componentDidUpdate(prevProps){
  //   if(!this.props.events === prevProps.events){
  //   let eventsCopy    = [...this.props.events];
  //   console.log('eventsCopy = ', eventsCopy)
  //   let eventsSorted  = Calculations.sortByEventDate(eventsCopy); // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
  //   console.log('eventsSorted = ', eventsSorted)
  //   //let firstEvent    = eventsSorted[0].eventDate;


  //   this.setState({ 
  //   eventsSorted    : eventsSorted,   
  //   //   // firstEventDate    : firstEvent,
  //   });
  //   }
  // }

  _eventsGraphicData(){


    let pEvts = [this.props.events]


    let eventsSorted  = Calculations.sortByEventDate(pEvts); // Sorting Events https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    // console.log('typeOf pEvts =', typeof (pEvts));
    // console.log('eventsSorted =', typeof (eventsSorted));

    let today = new Date();
    let startDate = today.setDate(today.getDate() - this.state.timeLineDays);

    // console.log('startDate = ', startDate);

    let daysBack = this.state.timeLineDays;
    let monthsBack = Number(daysBack)/30;

    let currentMonth = moment(new Date()).format('M YYYY');
    let startMonth  = moment(new Date()).subtract(monthsBack, 'M').format('M YYYY');

    // let b = moment(startDate).format('M YYYY');
    // let c = moment(startDate).add(1, 'M').format('MMM YYYY');
   
    // console.log('current = ', currentMonth)
    // console.log('startMonth = ', startMonth)
    
    
    let eventsMonthArray = []
    

    for (let j = 0; j <= monthsBack; j++){
      eventsMonthArray[j] =  moment(startDate).add(j, 'M').format('MMM-YYYY');
    }

    let mIndex = eventsMonthArray.length;

    // for (let k = 0; k < mIndex; k++){

    //   let eventDate = pEvts[k].eventDate;
    //   let evDateFormat = moment(new Date(eventDate)).format('MMM-YYYY');

    //   console.log('evDate = ', evDateFormat);
    // }

    // this.setState({
    //   xData : eventsMonthArray,
    // })

    // console.log('el xData = ', this.state.XData);
   


    

    let eventsData = 12 //[{seriesName: 'Eventos', xData:[], value:[]}];

    return eventsData

  }
  
  render() {

    return (

    
      <div className="events-chart">

        {this.state.patientName === '' ? <p>LOADING !</p> : <div>
          {this._eventsGraphicData()}
          <EChartBars patID={this.props.patID} tLine={this.state.timeLineDays}/>
          </div>
        }

      </div>
         

    );
  };
};

