import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBlogs, getBlog } from "./blogService"; // Corrected import

export const getAllBlogs = createAsyncThunk(
    "blogs/getAllBlogs",
    async (_, thunkAPI) => {
        try {
            return await getBlogs();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getABlog = createAsyncThunk(
    "blogs/getABlog",
    async (id, thunkAPI) => {
        try {
            return await getBlog(id); // Corrected the method to get a single blog
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const blogState = {
    blogs: [], // Corrected property name
    singleBlog: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const blogSlice = createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.blogs = action.payload; // Corrected property name
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            })
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleBlog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
            });
    },
});

export default blogSlice.reducer;
