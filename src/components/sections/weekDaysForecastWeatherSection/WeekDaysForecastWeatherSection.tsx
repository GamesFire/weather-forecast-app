import { FC, useEffect, useMemo } from "react";
import Loader from "@/components/loader/Loader";
import WeekDayForecastWeather from "./weekDayForecastWeather/WeekDayForecastWeather";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import { fetchCurrentWeekDaysForecastWeather } from "@/store/reducers/action-creators/currentWeekDaysForecastWeather";
import { generateCacheKey } from "@/utils/generateCacheKey";
import { setCurrentWeekDaysForecastWeather } from "@/store/reducers/slices/currentWeekDaysForecastWeatherSlice";

const WeekDaysForecastWeatherSection: FC = () => {
  const { countryCode, city, latitude, longitude } = useAppSelector(
    (state: RootState) => state.currentGeolocationReducer
  );
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );
  const { currentLanguage } = useAppSelector(
    (state: RootState) => state.currentLanguageReducer
  );
  const {
    currentWeekDaysForecastWeather,
    isLoadingCurrentWeekDaysForecastWeather,
    errorCurrentWeekDaysForecastWeather,
    cachedCurrentWeekDaysForecastWeather,
  } = useAppSelector(
    (state: RootState) => state.currentWeekDaysForecastWeatherReducer
  );
  const { errorCurrentForecastWeather } = useAppSelector(
    (state: RootState) => state.currentForecastWeather
  );
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
      const keyCurrentWeekDaysForecastWeather = generateCacheKey();
      const cachedCurrentWeekDaysForecastWeatherData =
        cachedCurrentWeekDaysForecastWeather[keyCurrentWeekDaysForecastWeather];

      if (cachedCurrentWeekDaysForecastWeatherData) {
        dispatch(
          setCurrentWeekDaysForecastWeather(
            cachedCurrentWeekDaysForecastWeatherData
          )
        );
      } else {
        dispatch(fetchCurrentWeekDaysForecastWeather(currentRequestParams));
      }
    }
  }, [cachedCurrentWeekDaysForecastWeather, currentRequestParams, dispatch]);

  const filteredWeekDaysForecastWeatherList =
    currentWeekDaysForecastWeather?.list?.filter((item) => {
      const dateTime = item.dt_txt.split(" ");
      const time = dateTime[1];

      return time === "12:00:00" && new Date(dateTime[0]) > new Date();
    });

  return (
    <section
      className={`${
        errorCurrentWeekDaysForecastWeather &&
        errorCurrentForecastWeather &&
        "mt-16 lg:mt-32"
      }`}
    >
      <div
        className={`flex ${
          isLoadingCurrentWeekDaysForecastWeather
            ? "justify-center"
            : "justify-between"
        } lg:justify-around items-center mt-8 lg:mt-12 pb-6 lg:pb-2 overflow-x-auto lg:overflow-hidden no-scrollbar`}
      >
        {errorCurrentWeekDaysForecastWeather ? (
          <h1 className="text-xl lg:text-2xl 6xl:text-4xl mx-auto px-2">
            {errorCurrentWeekDaysForecastWeather}
          </h1>
        ) : (
          <>
            {isLoadingCurrentWeekDaysForecastWeather ? (
              <Loader />
            ) : (
              <>
                {filteredWeekDaysForecastWeatherList?.map(
                  (weekDayForecastWeatherItem) => (
                    <div
                      key={weekDayForecastWeatherItem.dt_txt}
                      className="w-36 6xl:w-48 mr-10 last:mr-0 lg:w-auto lg:mr-0"
                    >
                      <WeekDayForecastWeather
                        weekDayForecastWeather={weekDayForecastWeatherItem}
                      />
                    </div>
                  )
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default WeekDaysForecastWeatherSection;
