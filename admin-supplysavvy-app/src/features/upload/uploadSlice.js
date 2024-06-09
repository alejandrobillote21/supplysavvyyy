import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk("upload/images", async (data, thunkAPI) => {
  try {
      return await uploadService.uploadImg(data);
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const delImg = createAsyncThunk("delete/images", async (id, thunkAPI) => {
  try {
      return await uploadService.deleteImg(id);
  } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(uploadImg.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(uploadImg.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isError = false;
              state.isSuccess = true;
              state.images = action.payload;
          })
          .addCase(uploadImg.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.payload.message;
          })
          .addCase(delImg.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(delImg.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isError = false;
              state.isSuccess = true;
              state.images = state.images.filter(img => img.public_id !== action.meta.arg);
          })
          .addCase(delImg.rejected, (state, action) => {
              state.isLoading = false;
              state.isError = true;
              state.isSuccess = false;
              state.message = action.payload.message;
          });
  },
});

export default uploadSlice.reducer;
