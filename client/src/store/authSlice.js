import { createSlice } from '@reduxjs/toolkit';

// Helper function to load user info from localStorage safely
const loadUserInfo = () => {
  try {
    const serializedUserInfo = localStorage.getItem('userInfo');
    return serializedUserInfo ? JSON.parse(serializedUserInfo) : null;
  } catch (error) {
    console.error('Failed to parse user info', error);
    return null;
  }
};

const initialState = {
  userInfo: loadUserInfo(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.error('Failed to save user info', error);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.userInfo;

export default authSlice.reducer;