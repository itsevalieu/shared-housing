import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {}
}));

export const FormInput = ({ id, label, value, handleChange, handleBlur }) => {
  const classes = useStyles();
  return (
    <TextField
      id={id}
      label={label}
      className={classes.root}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

FormInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string
};

FormInput.defaultProps = { id: null };

export default FormInput;
