import React from 'react';

// CSS
import './index.css';


export default class EditButton extends React.Component {
  constructor(props){
    super(props);
 

  };

  render(){
    
    return (
      <button id="plain" onClick={this.props.fn}>
        {this.props.text}
      </button>
    );
  }
}
