import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { RootState } from "./store/store";
import { getLocation } from "./utils/getLocation";
import { adjustAppContainerHeight } from "./utils/adjustAppContainerHeight";
import i18n from "./i18n";
import Header from "@components/header/Header";
import CurrentForecastWeatherSection from "@/components/sections/currentForecastWeatherSection/CurrentForecastWeatherSection";
import WeekDaysForecastWeatherSection from "@/components/sections/weekDaysForecastWeatherSection/WeekDaysForecastWeatherSection";
import Sidebar from "@components/sidebar/Sidebar";
import { setCurrentLanguage } from "./store/reducers/slices/currentLanguageSlice";
import { setShowSidebar } from "./store/reducers/slices/showSidebarSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

const App: FC = () => {
  const { currentLanguage } = useAppSelector(
    (state: RootState) => state.currentLanguageReducer
  );
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );
  const { errorCurrentForecastWeather } = useAppSelector(
    (state: RootState) => state.currentForecastWeather
  );
  const [error, setError] = useState<string | null>(null);
  const appContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLocation(dispatch).catch((error: Error) => {
      dispatch(setCurrentLanguage("en"));
      i18n.changeLanguage("en");
      setError(error.message);
    });
  }, [dispatch, currentLanguage]);

  useEffect(() => {
    return adjustAppContainerHeight(appContainerRef);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1024) {
        dispatch(setShowSidebar(false));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  const toggleSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
  };

  return (
    <div ref={appContainerRef} className={`app-container`} role="app-container">
      <div className="5xl:max-w-screen-5xl 5xl:mx-auto">
        <Header />
        <main>
          {error ? (
            <h1 className="my-y text-xl lg:my-10 lg:text-2xl ">{error}</h1>
          ) : (
            <>
              <CurrentForecastWeatherSection />
              {!showSidebar && <WeekDaysForecastWeatherSection />}
            </>
          )}
          <div
            className={`sidebar-toggle ${
              errorCurrentForecastWeather && "hidden"
            } lg:hidden ${showSidebar && "open"}`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faAngleDoubleUp} />
          </div>
          <Sidebar />
        </main>
      </div>
    </div>
  );
};

export default App;
