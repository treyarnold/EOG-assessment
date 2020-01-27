import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as measurementReducer } from '../Features/Measurements/reducer';
import { reducer as metricReducer } from '../Features/MetricSelect/reducer';

export default {
  weather: weatherReducer,
  measurements: measurementReducer,
  metrics: metricReducer,
};
