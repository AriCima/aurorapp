import React from 'react';

// CSS
import './index.css';


export default class MyButtonPlain extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active      : false,
      texts       : this.props.text,
      title       : this.props.title,
      selection   : '',
    }
 
    this._renderSelect = this._renderSelect.bind(this);
    this.onChangeState = this.onChangeState.bind(this);

  };

  onChangeState(value){
    
    console.log('click con value = ', this.state.selection )
    
    this.props.func(this.state.selection)
  };
    
  

  _renderSelect(x){ 	

    return x.map((text, j) => {	

      return (	


        <form className="select-wrapper" key={j}>

          {/* <button id="round" value={text} onClick={this.handleChange}>
            <div className="innercirlce">

            </div>
          </button> */}

          <input
            checked={this.state.selectedValue === 'a'}
            onChange={this.handleChange}
            value="a"
            name="radio-button-demo"
            aria-label="A"
          />

          <div className="select-text-box">
            <p value={text}>{text}</p>
          </div>

        </form>
      )	
    })	
  }
   

  render(){
    
    return (
      <div className="select-check-section">

        <div className="select-title">
          <p>{this.state.title}</p>
        </div>
        <div className="select-render">
          {this. _renderSelect(this.state.texts)}
        </div>
      </div>
    );
  }
}
