import { FC } from "react";
import { IList } from "@/store/models/ICurrentWeekDaysForecastWeather";
import {
  ShortNameOfTheDaysOfTheWeek,
  WeekDaysShortNames,
} from "@/types/weekDaysShortNames";
import roundAllNumbers from "@/utils/roundAllNumbers";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import { getWeatherIconName } from "@/utils/getWeatherIconName";
import { useTranslation } from "react-i18next";

interface WeekDayForecastWeatherProps {
  weekDayForecastWeather: IList;
}

const WeekDayForecastWeather: FC<WeekDayForecastWeatherProps> = ({
  weekDayForecastWeather,
}) => {
  const { t } = useTranslation("translation");
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );

  const isMetricActive = currentUnits === "metric";
  const weekDayWeatherIconName = getWeatherIconName(
    weekDayForecastWeather?.weather[0] ?? undefined
  );
  const weekDayIndex = new Date(weekDayForecastWeather.dt_txt).getDay();
  const weekDay = ShortNameOfTheDaysOfTheWeek[
    weekDayIndex
  ] as WeekDaysShortNames;
  const translatedWeekDay = t(
    `days_of_week.short_name_of_the_days_of_the_week.${weekDay}`
  );
  let weekDayTemperature = weekDayForecastWeather.main.temp;
  const weekDayWeatherDescription =
    weekDayForecastWeather.weather[0].description;

  [weekDayTemperature] = roundAllNumbers([weekDayTemperature]);

  return (
    <div className="w-36 lg:w-44 6xl:w-52 h-48 6xl:h-60 bg-indigo-950/60 rounded-xl px-5 pb-5 text-center overflow-hidden">
      <img
        className="mx-auto w-16 6xl:w-24"
        src={`/images/icons/${weekDayWeatherIconName}.svg`}
        alt={t("images.alt_week_day_weather_icon")}
      />
      <h3 className="text-xl lg:text-2xl 6xl:text-3xl mb-1">
        {translatedWeekDay}
      </h3>
      <p className="text-base lg:text-xl 6xl:text-2xl">
        {weekDayTemperature}
        {isMetricActive ? "\u00a0\u00b0C" : "\u00a0\u00b0F"}
      </p>
      <p className="text-base lg:text-xl 6xl:text-2xl">
        {weekDayWeatherDescription}
      </p>
    </div>
  );
};

export default WeekDayForecastWeather;
