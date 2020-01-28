import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
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
    maxHeight: '100vh',
  },
  chart: {
    width: 'auto',
    maxHeight: '75%',
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
      zoom: {
        enabled: false,
      },
    },

    xaxis: {
      type: 'datetime',
      labels: {
        datetimeFormatter: {
          hour: 'HH:mm',
        },
      },
    },
    tooltip: {
      followCursor: true,
      x: {
        format: 'HH:mm:ss',
      },
    },
    stroke: {
      width: 1,
    },
  },
  series: [],
};

const GraphMetrics = () => {
  const { metricData, selectedMetrics } = useSelector(getMetrics);
  const classes = useStyles();
  const [chartInfo, setChartInfo] = useState(chartData);

  useEffect(() => {
    if (selectedMetrics.length) {
      const chartData = selectedMetrics.map(metric => {
        const result = {
          ...metricData[metric].chartData,
        };
        return result;
      });
      setChartInfo(prevState => {
        const newState = {
          ...prevState,
          series: [...chartData],
        };
        return newState;
      });
    }
  }, [selectedMetrics, metricData]);

  return selectedMetrics.length ? (
    <>
      <Chart className={classes.chart} options={chartInfo.options} series={chartInfo.series} />
    </>
  ) : null;
};

export default GraphMetrics;
