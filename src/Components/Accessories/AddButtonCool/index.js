import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles, MuiThemeProvider, createMuiTheme, withTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(0, 187, 150)',
    
  },
  cssRoot: {
    color: theme.palette.getContrastText('rgb(0, 187, 150)'),
    backgroundColor: 'rgb(0, 187, 150)',
    color: 'white',
    fontSize: '12px',
    fontWeight: '550',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 187, 150,0.5)',
    },
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
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
          className={classNames(classes.margin, classes.cssRoot)}
        >
        {this.props.text}
        </Button>
      </div>
    );
  }
}

AddButtonCool.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButtonCool);