import { FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import CurrentFirstForecastWeatherDetails from "@components/common/currentFirstForecastWeatherDetails/CurrentFirstForecastWeatherDetails";
import CurrentSecondForecastWeatherDetails from "@components/common/currentSecondForecastWeatherDetails/CurrentSecondForecastWeatherDetails";
import "./sidebar.css";

const Sidebar: FC = () => {
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );

  return (
    <aside className={`sidebar ${showSidebar ? "open" : ""}`}>
      <div className="sidebar-content">
        <CurrentFirstForecastWeatherDetails />
        <CurrentSecondForecastWeatherDetails />
      </div>
    </aside>
  );
};

export default Sidebar;
