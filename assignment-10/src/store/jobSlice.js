import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    fetchJobsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  addJob,
} = jobSlice.actions;

export default jobSlice.reducer;