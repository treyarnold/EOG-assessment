import React from 'react';
import { useSubscription } from 'urql';

const newMeasurement = `
subscription sub {
	newMeasurement {
		metric
    at
    value
    unit
  }
}
`;

const handleSubscription = (measurements = [], response) => {
  console.log('reducer response', response);
  return [response.newMeasurement, ...measurements];
};

const SubTest = () => {
  const [res] = useSubscription({ query: newMeasurement }, handleSubscription);

  console.log(res);
  if (!res.data) {
    return <p>fetching</p>;
  }
  if (res.error) return <p>res.error</p>;
  return (
    <ul>
      {res.data.map(data => (
        <p key={data.value}>{`${data.metric} - ${data.value}${data.unit}`}</p>
      ))}
    </ul>
  );
};

export default SubTest;
