import React, { Component } from "react";
import InfoButton from './InfoButton';
import InfoDeployed from './InfoDeployed';

// REF --> https://www.kirupa.com/react/smooth-sliding-menu-react-motion.htm
 
export default class InfoContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            patientId   : this.props.patID,
            age         : this.props.age,
            visible     : false
        };
     
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.hideInfo = this.hideInfo.bind(this);
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

        // let myVar = null;
        setTimeout(this.hideInfo, 4500)
        
    }

    hideInfo(){
        this.setState({
            visible     : false
        })
    };
    
  render() {
    return (
        <div id="menu-container">
            
            <InfoButton 
                onMouseDown={this.handleMouseDown}
            />

            <InfoDeployed 
                patID={this.props.patID}
                age={this.props.age}
                onMouseDown={this.handleMouseDown}
                menuVisibility={this.state.visible}
            />
        </div>
    );
  }
}
 
