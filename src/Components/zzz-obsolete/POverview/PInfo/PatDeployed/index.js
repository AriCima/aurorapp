import React, { Component } from "react";

// AUX COMP
import moment from "moment";

// SERVICE API
import DataService from "../../../../services/DataService";
import Calculations from "../../../../services/Calculations";

// CSS
import "./index.css";
 
export default class PatDeployed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientId: this.props.patID,
      patientName: "",
      patientSurname: "",
      birthDate: "",
      birthWeight: "",
      firstEventDate: "",
      currentWeight: "",
    };
  }

  componentDidMount() {

    console.log('PatDeployed Comp Launched');
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

      <div id="sliding_menu"
        onMouseDown={this.props.handleMouseDown} 
        className={visibility}>

        <div className="p-info-line">    
          <div className="p-info-block">

            <div className="p-info-key">
              <p>Nombre: </p>
            </div>

            <div className="p-info-value">
             <h4>{this.state.patientName} {this.state.patientSurname}</h4>
            </div>

          </div>
        </div>  

        <div className="p-info-line">

              <div className="p-info-block half">
                  <div className="p-info-key">
                  <p>Edad: </p>
                  </div>
                  <div className="p-info-value">
                  <h4>{this.state.age}</h4>
                  </div>
              </div>

              <div className="p-info-block half">
                  <div className="p-info-key">
                  <p>Peso actual: </p>
                  </div>
                  <div className="p-info-value">
                  <h4>{this.state.currentWeight} Kg</h4>
                  </div>
              </div>

          </div>
      
      </div>

    );
    
  }
}
