import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowSidebarState {
  showSidebar: boolean;
}

const initialState: ShowSidebarState = {
  showSidebar: false,
};

export const showSidebarSlice = createSlice({
  name: "showSidebar",
  initialState,
  reducers: {
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { setShowSidebar } = showSidebarSlice.actions;

export default showSidebarSlice.reducer;
