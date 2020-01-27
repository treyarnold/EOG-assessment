import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = string[];

export type ApiErrorAction = {
  error: string;
};

const initialState: any = {
  metrics: [],
  selectedMetrics: [],
};

const slice = createSlice({
  name: 'metricSelect',
  initialState,
  reducers: {
    measurementApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
    metricsRecieved: (state, action: PayloadAction<Metrics>) => {
      state.metrics = action.payload;
    },
    metricSelected: (state, action: PayloadAction<Metrics>) => {
      state.selectedMetrics = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
