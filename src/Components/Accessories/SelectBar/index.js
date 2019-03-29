import React from "react";
import React, { Component } from "react";
import Select from "react-select";



export default class SelectBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Select options={this.props.options} />;
  }
}
