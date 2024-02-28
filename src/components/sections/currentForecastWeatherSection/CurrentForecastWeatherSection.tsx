import { FC } from "react";
import CurrentMainForecastWeatherDetails from "./currentMainForecastWeatherDetails/CurrentMainForecastWeatherDetails";
import CurrentFirsForecasttWeatherDetails from "@/components/common/currentFirstForecastWeatherDetails/CurrentFirstForecastWeatherDetails";
import CurrentSecondForecastWeatherDetails from "@/components/common/currentSecondForecastWeatherDetails/CurrentSecondForecastWeatherDetails";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";

const CurrentForecastWeatherSection: FC = () => {
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );

  return (
    <section>
      <div
        className={`flex justify-evenly items-center ${
          showSidebar ? "mt-8" : "mt-5"
        }`}
      >
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
