import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentGeolocation } from "@/store/models/ICurrentGeolocation";

const initialState: ICurrentGeolocation = {
  countryCode: "",
  city: "",
  latitude: null,
  longitude: null,
};

export const currentGeolocationSlice = createSlice({
  name: "currentGeolocation",
  initialState,
  reducers: {
    setCurrentGeolocation: (
      state,
      action: PayloadAction<ICurrentGeolocation>
    ) => {
      state.countryCode = action.payload.countryCode;
      state.city = action.payload.city;
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setCurrentGeolocation } = currentGeolocationSlice.actions;

export default currentGeolocationSlice.reducer;
