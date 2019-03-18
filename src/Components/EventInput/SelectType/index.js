import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Radio from '@material-ui/core/Radio';

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
};

class SelectType extends React.Component {
  state = {
    selectedValue: 'a',
  };

  handleChange = event => {
    this.setState({ selectedValue: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="selector-wrapper">
          <Radio
            checked={this.state.selectedValue === 'De ausencia'}
            onChange={this.handleChange}
            value='De ausencia'
            name="radio-button-demo"
            aria-label="A"
          />
          <div className="selector-text">
            <p>Selector A</p>
          </div>
        </div>
        <Radio
            checked={this.state.selectedValue === 'Focal'}
            onChange={this.handleChange}
            value="Focal"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Micolónica'}
            onChange={this.handleChange}
            value="Micolónica"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Tónica-clónica'}
            onChange={this.handleChange}
            value="Tónica-clónica"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Tónica'}
            onChange={this.handleChange}
            value="Tónica"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Atónica'}
            onChange={this.handleChange}
            value="Atónica"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Espasmos'}
            onChange={this.handleChange}
            value="Espasmos"
            name="radio-button-demo"
            aria-label="B"
        />
        <Radio
            checked={this.state.selectedValue === 'Otra'}
            onChange={this.handleChange}
            value="Otra"
            name="radio-button-demo"
            aria-label="B"
        />
      </div>
    );
  }
}

SelectType.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectType);