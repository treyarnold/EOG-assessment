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

export type ApiErrorAction = {
  error: string;
};

const initialState: any = {
  timeStampAfter: Date.now() - 1800000,
  metrics: [],
  metricData: {},
  lastKnown: {},
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    metricDataReceived: (state, action: PayloadAction<Reading>) => {
      const { metric, at, value, unit } = action.payload;
      const reading = {
        at: at,
        value: value,
      };
      if (state.metricData[metric]) {
        state.metricData[metric].readings.push(reading);
      } else {
        state.metricData[metric] = {};
        state.metricData[metric].unit = unit;
        state.metricData[metric].readings = [reading];
      }
      state.lastKnown[metric] = reading;
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
