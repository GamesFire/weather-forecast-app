import { Units } from "@/types/units";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUnitsState {
  currentUnits: Units;
}

const initialState: CurrentUnitsState = {
  currentUnits: "metric",
};

export const currentUnitsSlice = createSlice({
  name: "currentUnits",
  initialState,
  reducers: {
    setCurrentUnits: (state, action: PayloadAction<Units>) => {
      state.currentUnits = action.payload;
    },
  },
});

export const { setCurrentUnits } = currentUnitsSlice.actions;

export default currentUnitsSlice.reducer;
