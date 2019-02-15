import React from 'react';

// CSS
import './index.css';


export default class MyButtonPlain extends React.Component {
  constructor(props){
    super(props);
 
  };

  render(){
    
    return (
      <button id="plain">
        {this.props.text}
      </button>
    );
  }
}
