import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';

// CSS
import './index.css';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(0, 187, 150)',
    padding: '5px',
    boxShadow: 'none',
    
  },
  cssRoot: {
    color: theme.palette.getContrastText('rgb(0, 187, 150)'),
    border: 'solid 1px rgb(0, 187, 150)',
    backgroundColor: 'white',
    color: 'rgb(0, 187, 150)',
    fontSize: '12px',
    fontWeight: '550',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'rgba(0, 187, 150,0.5)',
      color: 'white',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    boxShadow: 'none',
  },
});

class AddButtonCool extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    const { classes } = this.props;
    return (
      
      <div>
        <Button
          variant="contained"
          color="primary"
          box-shadow="none"
          className={classNames(classes.margin, classes.cssRoot)}
        >
        {this.props.text}
        </Button>
      </div>
    );
  }
}

AddButtonPlain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButtonPlain);