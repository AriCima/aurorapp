import React, { Component } from "react";
import InfoButton from './InfoButton';
import InfoDeployed from './InfoDeployed';

// REF --> https://www.kirupa.com/react/smooth-sliding-menu-react-motion.htm
 
export default class InfoContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            patientId   : this.props.patID,
            age: this.props.age,
            visible     : false
        };
     
        this.onClick = this.onClick.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
     
    onClick(e) {
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
            
            <InfoButton 
                infoClick={this.onClick}
            />

            <InfoDeployed 
                patID={this.props.patID}
                age={this.props.age}
                infoClick={this.onClick}
                menuVisibility={this.state.visible}
            />
        </div>
    );
  }
}
 
