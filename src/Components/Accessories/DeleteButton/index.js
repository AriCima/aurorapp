import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function DeleteButton(props) {
  const { classes } = props;
  return (
    <div>
     
      <Button variant="fab" disabled aria-label="Delete" className={classes.button}>
        <DeleteIcon />
      </Button>

    </div>
  );
}

DeleteButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteButton);