import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, MeasurementResponse, Reading } from './reducer';
import { useSubscription } from 'urql';
import { Container, Grid } from '@material-ui/core';

import MetricSelect from './MetricSelect';

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

const handleSubscription = (measurements: Reading[] = [], response: MeasurementResponse) => {
  return [response.newMeasurement];
};

const Dashboard: React.FC = () => {
  const [res] = useSubscription({ query: newMeasurements }, handleSubscription);
  const dispatch = useDispatch();
  if (!res.data) return <div>Loading</div>;
  dispatch(actions.metricDataReceived(res.data[0]));

  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          foo
        </Grid>
        <Grid item xs={6}>
          <MetricSelect />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
