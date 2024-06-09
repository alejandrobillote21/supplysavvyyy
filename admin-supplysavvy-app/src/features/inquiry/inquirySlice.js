import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import inquiryService from "./inquiryService";

export const getInquiries = createAsyncThunk(
  "inquiry/get-inquiries",
  async (thunkAPI) => {
    try {
      return await inquiryService.getInquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAInquiry = createAsyncThunk(
  "inquiry/delete-inquiry",
  async (id, thunkAPI) => {
    try {
      return await inquiryService.deleteInquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAInquiry = createAsyncThunk(
  "inquiry/get-inquiry",
  async (id, thunkAPI) => {
    try {
      return await inquiryService.getInquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAInquiry = createAsyncThunk(
  "inquiry/update-inquiry",
  async (inq, thunkAPI) => {
    try {
      return await inquiryService.udpateInquiry(inq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  inquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const inquirySlice = createSlice({
  name: "inquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.inquiries = action.payload;
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedInquiry = action.payload;
      })
      .addCase(deleteAInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.inqName = action.payload.name;
        state.inqMobile = action.payload.mobile;
        state.inqEmail = action.payload.email;
        state.inqComment = action.payload.comment;
        state.inqStatus = action.payload.status;
      })
      .addCase(getAInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAInquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAInquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedInquiry = action.payload;
      })
      .addCase(updateAInquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default inquirySlice.reducer;
