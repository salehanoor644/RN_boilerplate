import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserDetail {
  userDetail: Record<string, any> | null;
}

const initialState: UserDetail = {
  userDetail: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<string | any>) => {
      state.userDetail = action.payload;
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
