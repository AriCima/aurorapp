import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
// CSS
import './index.css';

export default class InfoButton extends Component {
  render() {
    return (
      <button className="button" onMouseDown={this.props.infoClick}>
        <FontAwesomeIcon icon="info-circle" />
      </button>
    );
  }
}
