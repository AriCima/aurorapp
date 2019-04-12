import React, { Component } from "react";

// AUX COMP
import moment from "moment";

// SERVICE API
import DataService from "../../../../services/DataService";
import Calculations from "../../../../services/Calculations";

// CSS
import "./index.css";
 
export default class InfoDeployed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patID,
      age: this.props.age,
      patientName: "",
      patientSurname: "",
      birthDate: "",
      birthWeight: "",
      firstEventDate: "",
      currentWeight: "",
    };
  }

  componentDidMount() {
    DataService.getPatientInfo(this.props.patID)
    .then(res => {
    let name = res.patientName;
    let surname = res.patientSurname;
    let born = res.birthDate;
    this.setState({
        patientName: name,
        patientSurname: surname,
        birthDate: born,
    });
    })
    .catch(function(error) {
    console.log(error);
    });

    DataService.getPatientsEvents(this.props.patID)
    .then(events => {
    let eSorted = Calculations.sortByDateAsc(events);
    let fEvent = eSorted[0].date;

    this.setState({
        firstEventDate: moment(fEvent).format("DD-MMM-YYYY")
    });
    })
    .catch(function(error) {
    console.log(error);
    });

    DataService.getPatientsWeights(this.props.patID)
    .then(weights => {
    let wSorted = Calculations.sortByDateAsc(weights);
    // console.log('wSorted', wSorted);
    let wL = wSorted.length;

    let cWeight = wSorted[wL - 1].weight;

    this.setState({
        currentWeight: cWeight
    });
    })
    .catch(function(error) {
    console.log(error);
    });
  }

  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (

      <div id="sliding_menu"  className={visibility} onClick={this.props.infoClick}>

        <div id="sliding-info-block-name">

            <div id="sliding-info-value-name">
                <p>{this.state.patientName} {this.state.patientSurname}</p>
            </div>
        </div>

        <div id="sliding-info-block">

            <div id="sliding-info-key">
                <p>Edad: </p>
            </div>
            <div id="sliding-info-value">
                <p>{this.props.age}</p>
            </div>
        </div>

        <div id="sliding-info-block">
            <div id="sliding-info-key">
                <p>Peso actual: </p>
            </div>
            <div id="sliding-info-value">
                <p>{this.state.currentWeight} Kg</p>
            </div>
        </div>
      
      </div>

    );
    
  }
}
