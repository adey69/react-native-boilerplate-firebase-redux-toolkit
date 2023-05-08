import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchUser, signOut} from '../../data';

const INITIAL_STATE: IAuthState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (payload: IFetchUserPayload) => {
    const user = await fetchUser(payload);
    return user;
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUser.pending, state => {
      console.log('in loading');
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log('in failed', action.error);
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log('in success');
      state.isLoading = false;
      state.error = undefined;
      state.user = action.payload;
    });
    builder.addCase(logout.pending, state => {
      console.log('in logout loading');
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log('in logout failed', action.error);
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, state => {
      console.log('in logout success');
      state.isLoading = false;
      state.error = undefined;
      state.user = undefined;
    });
  },
});

export default authSlice.reducer;
