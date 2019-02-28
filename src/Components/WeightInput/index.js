import React from 'react';

// SERVICE API
import DataService from '../services/DataService';
import Calculations from '../services/Calculations';

//ACCESORIES
import SubmitButton from '../Accessories/SubmitButton';


import './index.css'; 


export default class WeightInput extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      patientId       : this.props.patID,
      patientsWeights : [],
      date      : '',
      weight          : null,
    };

  }

  componentDidMount(){
    DataService.getPatientInfo(this.state.patientId)
    .then(res => {
      console.log('res  = ', res);

      this.setState({ 
          patientsWeights  : res.patientsWeights,
          
      });

    })
    .catch(function (error) {    
    console.log(error);
    })    
  }

  onChangeState(field, value){
    let readingInfo = this.state;
    readingInfo[field] = value;
    this.setState(readingInfo)
  };

  onNewWeight(e){
      e.preventDefault();       

      let rCode = Calculations.generateCode();
      let noCommas = this.state.weight.replace(",", ".");

      console.log('weight date ?', this.state.date)

      let newWeight = {
          readingCode : rCode,
          date        : this.state.weightDate,
          weight      : noCommas,
      };

      console.log('newWeight / state.weights = ', newWeight, ' / ', this.state.patientsWeights)

      let transWeights = this.state.patientsWeights;
      transWeights.push(newWeight);


      this.setState({
        patientsWeights : transWeights,
      })

      DataService.addNewWeight(this.props.patID, transWeights)
      .then((result) => {

          console.log('new Weight succesfully registered');
          this.props.propsFn.push(`/patient/${this.props.patID}`)

      })
      .catch(function (error) {    
          console.log(error);
      })
    
      
  };

  
  render() {

    return (

        <div className="w-form-container">

            <div className="w-form-title">
                <h2>Registro del peso</h2>
            </div>

            <form  id="w-form-format" onSubmit={this.onNewWeight}>
            
                <div id="w-input-area">
                  <label className="w-label-date">
                    <p>Fecha</p>
                    <input className="w-input-date"
                        size="150"
                        type="date"
                        value={this.state.date}
                        onChange={(e)=>{this.onChangeState('date', e.target.value)}}
                    /> 
                  </label>

                  <label className="w-label-short">
                    <p>Peso [Kg]</p>
                    <input className="w-input-short" type="text" name="Comienzo"
                        size="150" 
                        value={this.state.startTime}
                        onChange={(e)=>{this.onChangeState('startTime', e.target.value)}}
                    /> 
                  </label>
                </div>

                <div className="w-button-area">
                  <SubmitButton text={'GUARDAR'}/>
                </div>
            </form>
        </div>
    );
  }
}
