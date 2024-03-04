import { Units } from "@/types/units";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface CurrentUnitsState {
  currentUnits: Units;
}

const defaultUnits = (Cookies.get("units") || "metric") as Units;

const initialState: CurrentUnitsState = {
  currentUnits: defaultUnits,
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
