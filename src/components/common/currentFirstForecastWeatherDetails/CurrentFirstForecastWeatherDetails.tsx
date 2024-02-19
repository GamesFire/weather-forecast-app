import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import roundAllNumbers from "@/utils/roundAllNumbers";
import { useTranslation } from "react-i18next";

const CurrentFirstForecastWeatherDetails: FC = () => {
  const { t } = useTranslation("translation");
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );
  const { currentForecastWeather, errorCurrentForecastWeather } =
    useAppSelector((state: RootState) => state.currentForecastWeather);

  const isMetricActive = currentUnits === "metric";
  const currentCloudiness = currentForecastWeather?.clouds.all ?? 0;
  const currentAtmosphericPressure = currentForecastWeather?.main.pressure ?? 0;
  let currentMinDailyTemperature = currentForecastWeather?.main.temp_min ?? 0;

  [currentMinDailyTemperature] = roundAllNumbers([currentMinDailyTemperature]);

  return (
    <div>
      {!errorCurrentForecastWeather && (
        <div className="text-base lg:text-lg 6xl:text-2xl text-center">
          <p className="lg:mb-16 xl:mb-20 lg:ml-52">
            {t("main.current_first_forecast_weather_details.cloudiness")}:{" "}
            {currentCloudiness}%
          </p>
          <p className="lg:mb-16 xl:mb-20">
            {t(
              "main.current_first_forecast_weather_details.atmospheric_pressure"
            )}
            : {currentAtmosphericPressure}&nbsp;
            {t("main.current_first_forecast_weather_details.hPa")}
          </p>
          <p className="lg:ml-52">
            {t("main.current_first_forecast_weather_details.min_daily")}:{" "}
            {currentMinDailyTemperature}
            {isMetricActive ? "\u00a0\u00b0C" : "\u00a0\u00b0F"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrentFirstForecastWeatherDetails;
