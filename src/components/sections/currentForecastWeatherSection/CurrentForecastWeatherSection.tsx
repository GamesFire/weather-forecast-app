import { FC } from "react";
import CurrentMainForecastWeatherDetails from "./currentMainForecastWeatherDetails/CurrentMainForecastWeatherDetails";
import CurrentFirsForecasttWeatherDetails from "@/components/common/currentFirstForecastWeatherDetails/CurrentFirstForecastWeatherDetails";
import CurrentSecondForecastWeatherDetails from "@/components/common/currentSecondForecastWeatherDetails/CurrentSecondForecastWeatherDetails";

const CurrentForecastWeatherSection: FC = () => {
  return (
    <section>
      <div className="flex justify-evenly items-center mt-5">
        <div className="hidden lg:flex">
          <CurrentFirsForecasttWeatherDetails />
        </div>
        <CurrentMainForecastWeatherDetails />
        <div className="hidden lg:flex">
          <CurrentSecondForecastWeatherDetails />
        </div>
      </div>
    </section>
  );
};

export default CurrentForecastWeatherSection;
