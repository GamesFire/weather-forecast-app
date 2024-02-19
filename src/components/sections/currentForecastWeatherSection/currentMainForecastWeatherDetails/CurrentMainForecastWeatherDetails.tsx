import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Loader from "@/components/loader/Loader";
import { fetchCurrentForecastWeather } from "@/store/reducers/action-creators/currentForecastWeather";
import roundAllNumbers from "@/utils/roundAllNumbers";
import { RootState } from "@/store/store";
import {
  WeekDaysFullNames,
  FullNameOfTheDaysOfTheWeek,
} from "@/types/weekDaysFullNames";
import { setCurrentForecastWeather } from "@/store/reducers/slices/currentForecastWeatherSlice";
import { generateCacheKey } from "@/utils/generateCacheKey";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { getWeatherIconName } from "@/utils/getWeatherIconName";

const CurrentMainForecastWeatherDetails: FC = () => {
  const { t } = useTranslation("translation");
  const { countryCode, city, latitude, longitude } = useAppSelector(
    (state: RootState) => state.currentGeolocationReducer
  );
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );
  const { currentLanguage } = useAppSelector(
    (state: RootState) => state.currentLanguageReducer
  );
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );
  const {
    currentForecastWeather,
    isLoadingCurrentForecastWeather,
    errorCurrentForecastWeather,
    cachedCurrentForecastWeather,
  } = useAppSelector((state: RootState) => state.currentForecastWeather);
  const dispatch = useAppDispatch();

  const currentRequestParams = useMemo(() => {
    return {
      currentGeolocation: {
        countryCode,
        city,
        latitude,
        longitude,
      },
      currentUnits,
      currentLanguage,
    };
  }, [countryCode, city, latitude, longitude, currentUnits, currentLanguage]);

  useEffect(() => {
    const { latitude, longitude } = currentRequestParams.currentGeolocation;

    if (latitude !== null && longitude !== null) {
      const keyCurrentForecastWeather = generateCacheKey();
      const cachedCurrentForecastWeatherData =
        cachedCurrentForecastWeather[keyCurrentForecastWeather];

      if (cachedCurrentForecastWeatherData) {
        dispatch(setCurrentForecastWeather(cachedCurrentForecastWeatherData));
      } else {
        dispatch(fetchCurrentForecastWeather(currentRequestParams));
      }
    }
  }, [cachedCurrentForecastWeather, currentRequestParams, dispatch]);

  const isMetricActive = currentUnits === "metric";
  const currentWeekDayIndex = new Date().getDay();
  const currentWeekDay = FullNameOfTheDaysOfTheWeek[
    currentWeekDayIndex
  ] as WeekDaysFullNames;
  const translatedCurrentWeekDay = t(
    `days_of_week.full_name_of_the_days_of_the_week.${currentWeekDay}`
  );
  const currentWeatherIconName = getWeatherIconName(
    currentForecastWeather?.weather[0] ?? undefined
  );
  let currentWeatherDescription =
    currentForecastWeather?.weather[0]?.description ?? "unknown";
  currentWeatherDescription = capitalizeFirstLetter(currentWeatherDescription);
  let currentTemperature = currentForecastWeather?.main.temp ?? 0;
  let currentFeelsLike = currentForecastWeather?.main.feels_like ?? 0;

  [currentTemperature, currentFeelsLike] = roundAllNumbers([
    currentTemperature,
    currentFeelsLike,
  ]);

  return (
    <div className="text-center lg:mx-3">
      {errorCurrentForecastWeather ? (
        <div>
          <h1 className="my-4 text-xl md:mt-24 md:mb-10 lg:mt-28 px-2 lg:text-2xl 6xl:text-4xl">
            {errorCurrentForecastWeather}
          </h1>
        </div>
      ) : (
        <>
          <h1
            className={`${
              showSidebar ? "text-xl" : "text-2xl"
            } lg:text-3xl 6xl:text-4xl`}
          >
            {translatedCurrentWeekDay}
          </h1>
          {isLoadingCurrentForecastWeather ? (
            <Loader />
          ) : (
            <img
              className={`mx-auto ${
                showSidebar ? "w-14" : "w-20"
              } lg:w-28 6xl:w-36`}
              src={`/images/icons/${currentWeatherIconName}.svg`}
              alt="Current weather icon"
            />
          )}
          <h2
            className={`${
              showSidebar ? "text-lg" : "text-xl"
            } lg:text-2xl 6xl:text-3xl`}
          >
            {currentTemperature}
            {isMetricActive ? "\u00a0\u00b0C" : "\u00a0\u00b0F"}
          </h2>
          <p
            className={`mt-1 mb-3 lg:mb-4 ${
              showSidebar ? "text-xs" : "text-sm"
            } lg:text-lg 6xl:text-xl`}
          >
            {t("main.current_main_forecast_weather_details.feel_like")}:{" "}
            {currentFeelsLike}
            {isMetricActive ? "\u00a0\u00b0C" : "\u00a0\u00b0F"}
          </p>
          <h2
            className={`${
              showSidebar ? "text-lg" : "text-xl"
            } lg:text-2xl 6xl:text-3xl`}
          >
            {isLoadingCurrentForecastWeather
              ? t("loader.loading_message")
              : currentWeatherDescription}
          </h2>
        </>
      )}
    </div>
  );
};

export default CurrentMainForecastWeatherDetails;
