import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IState } from '../../store';
// // import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
// import { makeStyles } from '@material-ui/core/styles';
// import { CardContent, Card, Grid, Typography } from '@material-ui/core';
// import { useQuery } from 'urql';
// import { actions } from './reducer';

// const useStyles = makeStyles(theme => ({
//   root: {},
// }));

// const getMetrics = (state: IState) => {
//   const { metricData, selectedMetrics, timestampAfter, metrics } = state.measurements;
//   return {
//     metricData,
//     selectedMetrics,
//     timestampAfter,
//     metrics,
//   };
// };

// const getHeartbeat = `
//   query {
//     heartBeat
//   }
// `;

const GraphMetrics: React.FC = () => {
  //   const { metricData, selectedMetrics, timestampAfter, metrics } = useSelector(getMetrics);
  //   const dispatch = useDispatch();
  //   const [heartBeat, setHeartBeat] = useState();
  //   const classes = useStyles();
  //   const heartBeats = useQuery({
  //     query: getHeartbeat,
  //   })[0].data;

  //   useEffect(() => {
  //     if (heartBeats) {
  //       setHeartBeat(heartBeats.heartBeat);
  //     }
  //   }, [heartBeats]);

  //   const [result] = useQuery({
  //     query: getMeasurementsQuery,
  //     variables: {
  //       metric: 'waterTemp',
  //       before: heartBeat,
  //       after: timestampAfter,
  //     },
  //   });
  //   console.log('graph', metricData);
  return <div> graph shit</div>;
};

export default GraphMetrics;
