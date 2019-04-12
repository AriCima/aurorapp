import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// CSS
import './index.css';
 
class MenuButton extends Component {
  render() {
    return (
      <button onMouseDown={this.props.handleMouseDown}>
        <FontAwesomeIcon icon="chevron-down" />
      </button>
    );
  }
}
 
export default MenuButton;