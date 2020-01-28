import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import { FormControl, InputLabel, Select, Input, Chip, MenuItem, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions, HistoryData } from './reducer';
import gql from 'graphql-tag';

const queryMetrics = `
  query {
    getMetrics
  }
`;

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    width: 700,
    marginLeft: 'auto',
    marginRight: '10%',
  },
  select: {
    marginTop: 30,
  },
}));

const getMeasurementsQuery = gql`
  query($metric: String!, $before: Timestamp, $after: Timestamp) {
    getMeasurements(input: { metricName: $metric, before: $before, after: $after }) {
      metric
      value
      unit
      at
    }
  }
`;

const getHeartbeat = `
  query {
    heartBeat
  }
`;

const MetricSelect: React.FC = () => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState<any>([]);
  const [lastMetricSelected, setLastMetricSelected] = useState();
  const [result] = useQuery({ query: queryMetrics });
  const { fetching, data, error } = result;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [heartBeat, setHeartBeat] = useState();
  const heartBeats = useQuery({
    query: getHeartbeat,
  })[0].data;
  const result2 = useQuery({
    query: getMeasurementsQuery,
    variables: {
      metric: `${lastMetricSelected}`,
      before: heartBeat,
      after: heartBeat - 1800000,
    },
  });
  const historicalData = result2[0].data;
  useEffect(() => {
    if (historicalData) {
      if (historicalData.getMeasurements && historicalData.getMeasurements.length > 0) {
        const data: HistoryData = {
          metric: historicalData.getMeasurements[0].metric,
          unit: historicalData.getMeasurements[0].unit,
          readings: historicalData.getMeasurements.map((res: any) => [res.at, res.value]),
        };

        dispatch(actions.metricHistoryReceived(data));
      }
    }
  }, [historicalData, dispatch]);

  useEffect(() => {
    if (heartBeats) {
      setHeartBeat(heartBeats.heartBeat);
    }
  }, [heartBeats]);

  useEffect(() => {
    if (fetching) return;
    if (error) return;
    setMetrics(data.getMetrics);
    dispatch(actions.metricsRecieved(data.getMetrics));
  }, [fetching, data, error, dispatch]);

  useEffect(() => {
    dispatch(actions.metricSelected(selectedMetrics));
  }, [selectedMetrics, dispatch]);

  const handleMetricSelected = (metric: any) => {
    setSelectedMetrics(metric);
    setLastMetricSelected(metric[metric.length - 1]);
  };

  return fetching ? (
    <div>loading</div>
  ) : (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">Select Metric</InputLabel>
      <Select
        multiple
        value={selectedMetrics}
        className={classes.select}
        onChange={event => handleMetricSelected(event.target.value)}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected: any) => (
          <div>
            {selected.map((value: any) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedMetrics((prevState: any[]) => prevState.filter((metric: any) => metric !== value))
                }
              />
            ))}
          </div>
        )}
      >
        {metrics.map(metric => {
          if (!selectedMetrics.includes(metric)) {
            return (
              <MenuItem key={metric} value={metric}>
                {metric}
              </MenuItem>
            );
          }
          return null;
        })}
      </Select>
    </FormControl>
  );
};

export default MetricSelect;
