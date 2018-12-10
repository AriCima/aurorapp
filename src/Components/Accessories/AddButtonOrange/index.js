import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    background: 'rgb(255, 204, 0)',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function AddButtonOrange(props) {
  const { classes } = props;
  return (
    <div>
      <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
      </Button>
    </div>
  );
}

AddButtonOrange.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButtonOrange);