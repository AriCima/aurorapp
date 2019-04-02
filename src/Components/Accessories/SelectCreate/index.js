import React from "react";
// import React, { Component } from "react";

// CREATE-SELECT BAR  https://react-select.com/creatable
import Creatable from 'react-select/lib/Creatable';

let styles = { width: '100%'}

export default class SelectCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption : '',
      field: this.props.field,
    }

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.value });
    console.log('el field recibido es = ', this.state.field)
    this.props.fn({
      field: this.state.field, 
      value: selectedOption.value
    })
  }
  // handleChange = ({field, value} ) => {
  //   console.log('selection =', value)
  //   this.setState({ 
  //     [field]: value
  //   });
  //   this.props.fn({field, value})
  //   console.log('handle launched ', this.state.selection)
  // }

  render() {
    // Props structure for the SelectBAr
    // const options = [
    //   { value: 'chocolate', label: 'Chocolate' },
    //   { value: 'strawberry', label: 'Strawberry' },
    //   { value: 'vanilla', label: 'Vanilla' }
    // ];

    const { selectedOption } = this.state;
    return (

      <Creatable 
        options={this.props.options} 
        value={selectedOption.value}
        onChange={this.handleChange}
        // onChange={e =>
        //   this.handleChange({
        //     field: 'inputOwnType',
        //     value: selection,
        //   })}
        styles={styles} 
      />
    )
  }
}
