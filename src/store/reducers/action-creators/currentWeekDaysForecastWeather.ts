import i18next from "i18next";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_WEATHER_API_URL, WEATHER_API_APP_ID_KEY } from "@/constants/api";
import { ICurrentRequestParams } from "@/store/models/ICurrentRequestParams";
import { ICurrentWeekDaysForecastWeather } from "@/store/models/ICurrentWeekDaysForecastWeather";
import { generateCacheKey } from "@/utils/generateCacheKey";

export interface FetchCurrentWeekDaysForecastWeatherResponse {
  cacheKey: string;
  data: ICurrentWeekDaysForecastWeather;
}

export const fetchCurrentWeekDaysForecastWeather = createAsyncThunk<
  FetchCurrentWeekDaysForecastWeatherResponse,
  ICurrentRequestParams
>(
  "currentWeekDaysForecastWeather/fetch",
  async (currentRequestParams, thunkApi) => {
    const { latitude, longitude } = currentRequestParams.currentGeolocation;
    const currentUnits = currentRequestParams.currentUnits;
    const currentLanguage = currentRequestParams.currentLanguage;

    try {
      const response: AxiosResponse<ICurrentWeekDaysForecastWeather> =
        await axios.get(`${BASE_WEATHER_API_URL}/forecast`, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: WEATHER_API_APP_ID_KEY,
            units: currentUnits,
            lang: currentLanguage,
          },
        });

      setTimeout(() => {
        thunkApi.dispatch(
          fetchCurrentWeekDaysForecastWeather(currentRequestParams)
        );
      }, 3 * 60 * 60 * 1000);

      const cacheKey = generateCacheKey();

      return { cacheKey, data: response.data };
    } catch (error) {
      setTimeout(() => {
        thunkApi.dispatch(
          fetchCurrentWeekDaysForecastWeather(currentRequestParams)
        );
      }, 60 * 1000);

      return thunkApi.rejectWithValue(
        i18next.t("errors.failed_to_load_current_week_days_weather_forecast")
      );
    }
  }
);
