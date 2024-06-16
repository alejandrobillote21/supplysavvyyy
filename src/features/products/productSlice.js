import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productService } from "./productService";

// Async thunk to fetch all products
export const getAllProducts = createAsyncThunk(
    "product/get",
    async (/*_,*/ thunkAPI) => {
        try {
            return await productService.getProducts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error/*.message*/);
        }
    }
);

// Async thunk to fetch a single product by ID
export const getAProduct = createAsyncThunk(
    "product/getAProduct",
    async (id, thunkAPI) => {
        try {
            return await productService.getSingleProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk to add a product to the wishlist
export const addToWishlist = createAsyncThunk(
    "product/wishlist",
    async (prodId, thunkAPI) => {
        try {
            return await productService.addToWishlist(prodId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Initial state for the product slice
const productState = {
    products: [],
    singleproduct: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Slice to handle product-related actions and state
export const productSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getAllProducts actions
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error/*payload*/;
            })
            // Handle addToWishlist actions
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.addToWishlist = action.payload;
                state.message = "Product Added To Wishlist!";
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error/*payload*/;
            })
            // Handle getAProduct actions
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleproduct = action.payload;
                state.message = "Product Fetched Successfully!";
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export default productSlice.reducer;





/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "./productService";

export const getAllProducts = createAsyncThunk(
  "product/get",
  async (_, thunkAPI) => {
    try {
      const products = await productService.getProducts();
      console.log("Fetched products:", products); // Log fetched products
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      return await productService.addToWishlist(prodId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message = "Product Added To Wishlist!";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;*/

