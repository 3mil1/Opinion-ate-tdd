import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import {useState} from 'react';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const NewRestaurantForm = ({createRestaurant}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (name) {
      setValidationError(false);
      setServerError(false);
      createRestaurant(name)
        .then(() => {
          setName('');
        })
        .catch(() => {
          setServerError(true);
        });
    } else {
      setValidationError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      <Box display="flex" className={classes.root}>
        {validationError && <Alert severity="error">Name is required</Alert>}
        <TextField
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add Restaurant"
          fullWidth
          variant="filled"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="new-restaurant-submit-button"
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
