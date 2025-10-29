import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  currentLanguage: string;
}

const initialState: AuthState = {
  currentLanguage: 'ar',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAppLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAppLanguage,
} = authSlice.actions;

export default authSlice.reducer;
