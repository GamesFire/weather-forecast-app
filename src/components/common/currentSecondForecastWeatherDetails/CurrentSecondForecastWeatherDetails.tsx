import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import roundAllNumbers from "@/utils/roundAllNumbers";
import { useTranslation } from "react-i18next";

const CurrentSecondForecastWeatherDetails: FC = () => {
  const { t } = useTranslation("translation");
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );
  const { currentForecastWeather, errorCurrentForecastWeather } =
    useAppSelector((state: RootState) => state.currentForecastWeather);

  const isMetricActive = currentUnits === "metric";
  const currentHumidity = currentForecastWeather?.main.humidity ?? 0;
  let currentWindSpeed = currentForecastWeather?.wind.speed ?? 0;
  let currentMaxDailyTemperature = currentForecastWeather?.main.temp_max ?? 0;

  [currentMaxDailyTemperature, currentWindSpeed] = roundAllNumbers([
    currentMaxDailyTemperature,
    currentWindSpeed,
  ]);

  return (
    <div>
      {!errorCurrentForecastWeather && (
        <div className="text-base lg:text-lg 6xl:text-2xl text-center">
          <p className="lg:mb-16 xl:mb-20 lg:mr-52">
            {t("main.current_second_forecast_weather_details.humidity")}:{" "}
            {currentHumidity}%
          </p>
          <p className="lg:mb-16 xl:mb-20">
            {t("main.current_second_forecast_weather_details.wind_speed")}:{" "}
            {currentWindSpeed}&nbsp;
            {isMetricActive
              ? t("main.current_second_forecast_weather_details.meter_sec")
              : t("main.current_second_forecast_weather_details.miles_hour")}
          </p>
          <p className="lg:mr-52">
            {t("main.current_second_forecast_weather_details.max_daily")}:{" "}
            {currentMaxDailyTemperature}
            {isMetricActive ? "\u00a0\u00b0C" : "\u00a0\u00b0F"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentSecondForecastWeatherDetails;
