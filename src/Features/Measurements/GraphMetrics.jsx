import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { makeStyles, Box } from '@material-ui/core';
import Chart from 'react-apexcharts';

const getMetrics = state => {
  const { metricData, selectedMetrics } = state.measurements;
  return {
    metricData,
    selectedMetrics,
  };
};

const useStyles = makeStyles(() => ({
  chartContainer: {
    width: '100%',
    dispay: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
}));

const chartData = {
  options: {
    noData: {
      text: 'Loading...',
    },
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000,
        },
        width: 400,
      },
    },

    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },
  series: [],
};

const chartSeries = {
  name: 'some shit',
  data: [30, 40, 45, 50, 49, 60, 70, 91],
};

const GraphMetrics = () => {
  const { metricData, selectedMetrics } = useSelector(getMetrics);
  const classes = useStyles();
  const [chartInfo, setChartInfo] = useState(chartData);
  console.log(metricData);

  const addData = () =>
    setChartInfo({
      ...chartInfo,
      series: [chartSeries],
    });

  return selectedMetrics.length ? (
    <>
      <Box className={classes.chartContainer} onClick={addData}>
        <Chart options={chartInfo.options} series={chartInfo.series} />
      </Box>
    </>
  ) : null;
};

export default GraphMetrics;
