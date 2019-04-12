import React, { Component } from "react";

import PatButton from './PatButton';
import PatDeployed from './PatDeployed';

// REF --> https://www.kirupa.com/react/smooth-sliding-menu-react-motion.htm
 
export default  class PatInfo extends Component {
  constructor(props, context) {
    super(props, context);
  
    this.state = {
      visible: false
    };
  
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
    
  handleMouseDown(e) {
      this.toggleMenu();
      console.log("clicked");
      e.stopPropagation();
  }
  
  toggleMenu() {
    this.setState({
        visible: !this.state.visible
    });
  }

    
  render() {
    return (
      <div id="menu-container">
          
        <PatButton 
          handleMouseDown={this.handleMouseDown}
        />

        <PatDeployed 
          handleMouseDown={this.handleMouseDown}
          menuVisibility={this.state.visible}
        />
          
      </div>
    );
  }
}
 
