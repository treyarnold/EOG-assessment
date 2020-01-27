import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paperContainer: {
    boxShadow: '1px 2px 1px 1px rgba(0,0,0,0.2)',
    minWidth: '200px',
    flex: 1,
    marginRight: '1rem',
    marginBottom: '1rem',
    padding: '1rem',
    background: 'white',
    borderRadius: '4px',
  },
  paper: {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
  },
}));

const getSelectedMetrics = (state: IState) => state.measurements.selectedMetrics;
const getLastMeasurements = (state: IState) => state.measurements.lastKnown;

const CurrentMeasurements: React.FC = () => {
  const selectedMetrics = useSelector(getSelectedMetrics);
  const lastMeasurements = useSelector(getLastMeasurements);
  const classes = useStyles();

  const MetricDisplay: any = (metric: any, value: number) => {
    return (
      <Box className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <Typography variant="h6">{metric.metric}</Typography>
          <Typography variant="h3">{metric.value}</Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box className={classes.container}>
      {selectedMetrics.length === 0
        ? null
        : // <div>
          //   {selectedMetrics}
          //   {lastMeasurements[selectedMetrics].value}
          // </div>
          selectedMetrics.map((data: string) => (
            <MetricDisplay key={data} metric={data} value={lastMeasurements[data].value} />
          ))}
    </Box>
  );
};

export default CurrentMeasurements;
