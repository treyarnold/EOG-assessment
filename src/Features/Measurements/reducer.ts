import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MeasurementResponse = {
  newMeasurement: Reading;
};

export type Reading = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

export type HistoryData = {
  metric: string;
  unit: string;
  readings: number[];
};

const initialState: any = {
  metrics: [],
  selectedMetrics: [],
  metricData: {},
  lastKnown: {},
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    metricDataReceived: (state, action: PayloadAction<Reading>) => {
      const { metric, at, value, unit } = action.payload;
      const reading = [at, value];
      if (state.metricData[metric]) {
        state.metricData[metric].chartData.data.push(reading);
      } else {
        state.metricData[metric] = {};
        state.metricData[metric].unit = unit;
        state.metricData[metric].chartData = {};
        state.metricData[metric].chartData.name = metric;
        state.metricData[metric].chartData.data = [reading];
      }
      state.lastKnown[metric] = value;
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricsRecieved: (state, action: PayloadAction<Metrics>) => {
      state.metrics = action.payload;
    },
    metricSelected: (state, action: PayloadAction<Metrics>) => {
      state.selectedMetrics = action.payload;
    },
    metricHistoryReceived: (state, action: PayloadAction<HistoryData>) => {
      const { metric, unit, readings } = action.payload;
      if (state.metricData[metric]) {
        state.metricData[metric].chartData.data = action.payload.readings.concat(state.metricData[metric]);
      } else {
        state.metricData[metric] = {};
        state.metricData[metric].unit = unit;
        state.metricData[metric].chartData = {};
        state.metricData[metric].chartData.name = metric;
        state.metricData[metric].chartData.data = [...readings];
      }
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
