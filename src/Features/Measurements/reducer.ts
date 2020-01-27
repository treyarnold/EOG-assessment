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

const initialState: any = {};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    metricDataRecvied: (state, action: PayloadAction<Reading>) => {
      const { metric, at, value, unit } = action.payload;
      if (state[metric]) {
        state[metric].readings.push({
          at: at,
          value: value,
        });
      } else {
        state[metric].unit = unit;
        state[metric].readings = [
          {
            at: at,
            value: value,
          },
        ];
      }
    },
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
