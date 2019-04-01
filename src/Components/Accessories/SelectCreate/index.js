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
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption.value });
    this.props.fn({
      field: 'inputOwnType', 
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
    const { selectedOption } = this.state;
    return (

      <Creatable 
        options={this.props.types} 
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
