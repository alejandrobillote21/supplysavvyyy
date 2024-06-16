import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

// Redux Thunks for async operations
//export const registerUser = createAsyncThunk(
//  "auth/register",
//  async (/*userData,*/ thunkAPI) => {
//    try {
//      return await authService.register(userData);
//    } catch (error) {
//      return thunkAPI.rejectWithValue({
//        message: error.response?.data?.message || error.message,
//        code: error.code,
//      });
//    }
//  }
//);

//export const loginUser = createAsyncThunk(
//  "auth/login",
//  async (userData, thunkAPI) => {
//    try {
//      return await authService.login(userData);
//    } catch (error) {
//      return thunkAPI.rejectWithValue({
//        message: error.response?.data?.message || error.message,
//        code: error.code,
//      });
//    }
//  }
//);

//export const getUserProductWishlist = createAsyncThunk(
//  "user/wishlist",
//  async (_, thunkAPI) => {
//    try {
//      return await authService.getUserWishlist();
//    } catch (error) {
//      return thunkAPI.rejectWithValue({
//        message: error.response?.data?.message || error.message,
//        code: error.code,
//      });
//    }
//  }
//);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
  }});

  export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        return await authService.login(userData);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }});

export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      return await authService.createOrder(orderDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/getUserCart",
  async (_, thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        code: error.code,
      });
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "user/cart/product/delete",
  async (cartItemId, thunkAPI) => {
    try {
      return await authService.removeProductFromCart(cartItemId);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        code: error.code,
      });
    }
  }
);

export const updateCartProduct = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProductFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || error.message,
        code: error.code,
      });
    }
  }
);

// Initial state for authSlice
const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  wishlist: [], // Array to hold user's wishlist
  cartProducts: [], // Array to hold user's cart products
};

// Create authSlice using createSlice from Redux Toolkit
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {}, // No additional reducers defined here
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created Successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error; //action.payload.message;
        if (state.isError === true) {
          toast.error(action.error);
        }

        //if (state.isError) {
          //toast.error(action.payload.message);
        //}
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User Login Successfully");
        }
        //if (state.isSuccess) {
        //  localStorage.setItem("token", action.payload.token);
        //  toast.info("User Login Successfully");
        //}
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error; //action.payload.message;
        if (state.isError === true) {
          toast.error(action.error);
        }

        //state.message = action.payload.message;
        //if (state.isError) {
        //  toast.error(action.payload.message);
        //}
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        /*state.message = action.payload.message || "Failed to fetch wishlist";*/
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts.push(action.payload); // Mutating state directly
        toast.success("Product Added to Cart");
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to add product to cart";
        toast.error(state.message);
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || 'Failed to fetch cart';
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Deleted from Cart Successfully!");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to delete product from cart";
        toast.error(state.message);
        if (!state.isSuccess) {
          toast.error("Something went wrong!");
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        toast.success("Product Updated in Cart Successfully!");
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to update product in cart";
        toast.error(state.message);
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        toast.success("Ordered Successfully!");
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message || "Failed to update product in cart";
        toast.error(state.message);
      });
  },
});

export default authSlice.reducer;