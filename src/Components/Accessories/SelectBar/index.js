import React from "react";
// import React, { Component } from "react";

// SELECT BAR  https://github.com/JedWatson/react-select
import Select from "react-select";

let styles = { width: '100%'}

export default class SelectBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Select options={this.props.types} styles = {styles} />;
  }
}
