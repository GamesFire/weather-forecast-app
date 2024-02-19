import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrentWeekDaysForecastWeather } from "@/store/models/ICurrentWeekDaysForecastWeather";
import {
  fetchCurrentWeekDaysForecastWeather,
  FetchCurrentWeekDaysForecastWeatherResponse,
} from "../action-creators/currentWeekDaysForecastWeather";

interface CachedCurrentWeekDaysForecastWeather {
  [key: string]: ICurrentWeekDaysForecastWeather;
}

interface CurrentWeekDaysForecastWeatherState {
  currentWeekDaysForecastWeather: ICurrentWeekDaysForecastWeather | null;
  isLoadingCurrentWeekDaysForecastWeather: boolean;
  errorCurrentWeekDaysForecastWeather: string;
  cachedCurrentWeekDaysForecastWeather: CachedCurrentWeekDaysForecastWeather;
}

const initialState: CurrentWeekDaysForecastWeatherState = {
  currentWeekDaysForecastWeather: null,
  isLoadingCurrentWeekDaysForecastWeather: false,
  errorCurrentWeekDaysForecastWeather: "",
  cachedCurrentWeekDaysForecastWeather: {},
};

export const currentWeekDaysForecastWeatherSlice = createSlice({
  name: "currentWeekDaysForecastWeather",
  initialState,
  reducers: {
    setCurrentWeekDaysForecastWeather: (
      state,
      action: PayloadAction<ICurrentWeekDaysForecastWeather>
    ) => {
      state.currentWeekDaysForecastWeather = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeekDaysForecastWeather.pending, (state) => {
        state.isLoadingCurrentWeekDaysForecastWeather = true;
      })
      .addCase(
        fetchCurrentWeekDaysForecastWeather.fulfilled,
        (
          state,
          action: PayloadAction<FetchCurrentWeekDaysForecastWeatherResponse>
        ) => {
          state.isLoadingCurrentWeekDaysForecastWeather = false;
          state.errorCurrentWeekDaysForecastWeather = "";

          const { cacheKey, data } = action.payload;

          if (!state.cachedCurrentWeekDaysForecastWeather[cacheKey]) {
            state.cachedCurrentWeekDaysForecastWeather[cacheKey] = data;
          }

          state.currentWeekDaysForecastWeather = data;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          action.type.startsWith("currentWeekDaysForecastWeather") &&
          action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.isLoadingCurrentWeekDaysForecastWeather = false;
          state.errorCurrentWeekDaysForecastWeather = action.payload;
        }
      );
  },
});

export const { setCurrentWeekDaysForecastWeather } =
  currentWeekDaysForecastWeatherSlice.actions;

export default currentWeekDaysForecastWeatherSlice.reducer;
