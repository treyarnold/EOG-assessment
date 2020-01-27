import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import { FormControl, InputLabel, Select, Input, Chip, MenuItem, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';

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

const MetricSelect: React.FC = () => {
  const [metrics, setMetrics] = useState([]);
  const [selectedMetrics, setSelectedMetrics] = useState<any>([]);
  const [result] = useQuery({ query: queryMetrics });
  const { fetching, data, error } = result;
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) return;
    if (error) return;
    setMetrics(data.getMetrics);
    dispatch(actions.metricsRecieved(data.getMetrics));
  }, [fetching, data, error]);

  useEffect(() => {
    dispatch(actions.metricSelected(selectedMetrics));
  }, [selectedMetrics]);

  return fetching ? (
    <div>loading</div>
  ) : (
    <FormControl className={classes.formControl}>
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      <InputLabel htmlFor="select-multiple-chip">Select Metric</InputLabel>
      <Select
        multiple
        value={selectedMetrics}
        className={classes.select}
        onChange={event => setSelectedMetrics(event.target.value)}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected: any) => (
          <div>
            {selected.map((value: any) => {
              // console.log('rendervalue', value);
              return (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() =>
                    setSelectedMetrics((prevState: any[]) => prevState.filter((metric: any) => metric !== value))
                  }
                />
              );
            })}
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
