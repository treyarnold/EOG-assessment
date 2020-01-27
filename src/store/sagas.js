import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import measurementSaga from '../Features/Measurements/saga';
import metricSelect from '../Features/MetricSelect/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(measurementSaga);
  yield spawn(metricSelect)
}
