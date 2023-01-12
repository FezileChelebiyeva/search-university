import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  loading: false,
  data: [],
  error: "",
  inputValue: "",
};

export const fetchData = createAsyncThunk("fetchData", async (uniName) => {
  const response = await axios.get(
    `http://universities.hipolabs.com/search?name=${uniName}`
  );
  return response.data;
});

export const getDataSlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    inputValue: (state, action) => {
      state.inputValue = action.payload;
      console.log(initialState.inputValue);
      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = "Data Not Found";
    });
  },
});

export const { inputValue } = getDataSlice.actions;

export default getDataSlice.reducer;
