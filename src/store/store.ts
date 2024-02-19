import { combineReducers, configureStore } from "@reduxjs/toolkit";
import currentForecastWeather from "./reducers/slices/currentForecastWeatherSlice";
import currentWeekDaysForecastWeatherReducer from "./reducers/slices/currentWeekDaysForecastWeatherSlice";
import currentGeolocationReducer from "./reducers/slices/currentGeolocationSlice";
import currentUnitsReducer from "./reducers/slices/currentUnitsSlice";
import currentLanguageReducer from "./reducers/slices/currentLanguageSlice";
import showSidebarReducer from "./reducers/slices/showSidebarSlice";

const rootReducer = combineReducers({
  currentForecastWeather,
  currentWeekDaysForecastWeatherReducer,
  currentGeolocationReducer,
  currentUnitsReducer,
  currentLanguageReducer,
  showSidebarReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
