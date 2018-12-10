import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// GOOGLE CHARTS --> https://react-google-charts.com/line-chart
import {Chart} from 'react-google-charts'

//CHARTKICK  --> https://chartkick.com/react
// import { LineChart, PieChart } from 'react-chartkick';

// MATERIAL UI
import AddButton from '../Accessories/AddButton'
import AddButtonOrange from '../Accessories/AddButtonOrange'
import AddButtonGreen from '../Accessories/AddButtonGreen'

// SERVICE API
import DataService from '../services/DataService';

// Components

// CSS
import './index.css';

export default class Patient extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      user          : this.props.userID,
      patientId     : this.props.patID,
      patientName   : '',
      patientSurname: '',
      bornDate      : '',
      weight        : '',
      patientEvents : []
    }
  }
 
  componentDidMount(){
    
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      const pat = res;

      //  - - - - - - - SORT EVENTS FROM RECENT TO OLDER 

      var eventsCopy = [...pat.patientEvents];

      function compare(a, b) {
        
        const dateA = a.eventDate;
        const dateB = b.eventDate;
      
        let comparison = 0;
        if (dateA > dateB) {
          comparison = -1;
        } else if (dateA < dateB) {
          comparison = 1;
        }
        return comparison;
      }
      
      eventsCopy.sort(compare);
      

     // - - - - - - - Sorting end 

      this.setState({ 
        patientName     : pat.patientName,
        patientSurname  : pat.patientSurname,
        bornDate        : pat.bornDate, 
        patientEvents   : eventsCopy,         
      });
    })
    .catch(function (error) {    
      console.log(error);
    })    
  }

  _renderPatientInfo(){
    return (
      <div className="patient-info"> 
        <div className="patient-info-block">
          <p>Nombre del paciente: </p><h4>{this.state.patientName} {this.state.patientSurname}</h4>
        </div>
        <div className="patient-info-block">
          <p>Fecha de nacimiento: </p><h4>{this.state.bornDate}</h4>
        </div>
      </div>
    )
  };

  _renderEventsInfo(){ 
    
    //console.log('render events triggered with: ', obj)
    return this.state.patientEvents.map((evts,j) => {
      return (
        <div className="list-container">
          <Link className="standard-list-row" key={j} to={`/single_event_overview/${evts.eventId}`}> 
          
            <div className="standard-list-info-block">
               <p>{evts.eventDate}</p>
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

      <div className="overview">

        <div className="upper-area">

            {this.state.patientName === '' ? <p>LOADING !</p> :
              this._renderPatientInfo()
            }

            <div className="add-buttons-area">
              <div className="standard-add-button">
                <div>
                  <Link to={`/new_event_register/${this.state.patientId}`}><AddButton color="red"/></Link>
                </div>
                <div id="button-info">
                  <p>Evento</p>
                </div>
              </div>
              <div className="standard-add-button">
                <div>
                  <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButtonOrange/></Link>
                </div>
                <div id="button-info">
                  <p>Peso/Fiebre</p>
                </div>
              </div>
              <div className="standard-add-button">
              <div>
                <Link to={`/patient_new_reading/${this.state.patientId}`}><AddButtonGreen/></Link>
              </div>
              <div id="button-info">
                <p>Medicación</p>
              </div>
            </div>
            </div>
        </div>
          
        <div className="middle-area">
          <Chart
            width={800}
            height={400}
            chartType="Line"
            loader={<div>Loading Chart</div>}
            data={[
              [
                'Day',
                'Var 1',
                'Var 2',
                'Var 3',
                'Var 4',
              ],
              [1,   37.8, 80.8, 41.8, 12],
              [2,   30.9, 69.5, 32.4, 12],
              [3,   25.4, 57,   25.7, 12],
              [4,   11.7, 18.8, 10.5, 12],
              [5,   11.9, 17.6, 10.4, 12],
              [6,    8.8, 13.6, 7.7, 12],
              [7,    7.6, 12.3, 9.6, 12],
              [8,   12.3, 29.2, 10.6, 12],
              [9,   16.9, 42.9, 14.8, 12],
              [10,  12.8, 30.9, 11.6, 12],
              [11,   5.3, 7.9,  4.7, 12],
              [12,   6.6, 8.4,  5.2, 12],
              [13,   4.8, 6.3,  3.6, 12],
              [14,   4.2, 6.2,  3.4, 12],
            ]}
            options={{
              chart: {
                title: 'Eventos registrados en el último mes',
                subtitle: '',
              },
            }}
          />
        </div>

        <div className="lower-area">
            <div className="list-title">
              <h2>Eventos registrados</h2>
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

      </div>

    );
  };
};

