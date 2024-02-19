import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentForecastWeather } from "../../models/ICurrentForecastWeather";
import {
  fetchCurrentForecastWeather,
  FetchCurrentForecastWeatherResponse,
} from "../action-creators/currentForecastWeather";

interface CachedCurrentForecastWeather {
  [key: string]: ICurrentForecastWeather;
}

interface CurrentForecastWeatherState {
  currentForecastWeather: ICurrentForecastWeather | null;
  isLoadingCurrentForecastWeather: boolean;
  errorCurrentForecastWeather: string;
  cachedCurrentForecastWeather: CachedCurrentForecastWeather;
}

const initialState: CurrentForecastWeatherState = {
  currentForecastWeather: null,
  isLoadingCurrentForecastWeather: false,
  errorCurrentForecastWeather: "",
  cachedCurrentForecastWeather: {},
};

export const currentForecastWeatherSlice = createSlice({
  name: "currentForecastWeather",
  initialState,
  reducers: {
    setCurrentForecastWeather: (
      state,
      action: PayloadAction<ICurrentForecastWeather>
    ) => {
      state.currentForecastWeather = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentForecastWeather.pending, (state) => {
        state.isLoadingCurrentForecastWeather = true;
      })
      .addCase(
        fetchCurrentForecastWeather.fulfilled,
        (state, action: PayloadAction<FetchCurrentForecastWeatherResponse>) => {
          state.isLoadingCurrentForecastWeather = false;
          state.errorCurrentForecastWeather = "";

          const { cacheKey, data } = action.payload;

          if (!state.cachedCurrentForecastWeather[cacheKey]) {
            state.cachedCurrentForecastWeather[cacheKey] = data;
          }

          state.currentForecastWeather = data;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          action.type.startsWith("currentForecastWeather") &&
          action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoadingCurrentForecastWeather = false;
          state.errorCurrentForecastWeather = action.payload;
        }
      );
  },
});

export const { setCurrentForecastWeather } =
  currentForecastWeatherSlice.actions;

export default currentForecastWeatherSlice.reducer;
