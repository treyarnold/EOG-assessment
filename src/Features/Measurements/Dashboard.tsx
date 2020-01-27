import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, MeasurementResponse, Reading } from './reducer';
import { useSubscription } from 'urql';
import { Container, Grid, Box, makeStyles } from '@material-ui/core';

import MetricSelect from './MetricSelect';
import CurrentMeasurements from './CurrentMeasurements';

const newMeasurements = `
subscription sub {
	newMeasurement {
		metric
    at
    value
    unit
  }
}
`;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

const handleSubscription = (measurements: Reading[] = [], response: MeasurementResponse) => {
  return [response.newMeasurement];
};

const Dashboard: React.FC = () => {
  const [res] = useSubscription({ query: newMeasurements }, handleSubscription);
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!res.data) return <div>Loading</div>;
  dispatch(actions.metricDataReceived(res.data[0]));

  return (
    <Box className={classes.container}>
      <CurrentMeasurements />
      <MetricSelect />
    </Box>
  );
};

export default Dashboard;
