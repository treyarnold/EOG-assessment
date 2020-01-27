import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, MeasurementResponse, Reading } from './reducer';
import { useSubscription } from 'urql';

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
  return [response.newMeasurement, ...measurements];
};

const Dashboard: React.FC = () => {
  const [res] = useSubscription({ query: newMeasurements }, handleSubscription);

  console.log(res);

  return <div>dashboard</div>;
};

export default Dashboard;
