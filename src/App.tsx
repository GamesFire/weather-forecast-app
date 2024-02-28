import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { useScreenOrientation } from "./hooks/useScreenOrientation";
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
  const {
    currentForecastWeather,
    isLoadingCurrentForecastWeather,
    errorCurrentForecastWeather,
  } = useAppSelector((state: RootState) => state.currentForecastWeather);
  const {
    currentWeekDaysForecastWeather,
    isLoadingCurrentWeekDaysForecastWeather,
    errorCurrentWeekDaysForecastWeather,
  } = useAppSelector(
    (state: RootState) => state.currentWeekDaysForecastWeatherReducer
  );
  const [error, setError] = useState<string>("");
  const appContainerRef = useRef<HTMLDivElement>(null);
  const sidebarToggleRef = useRef<HTMLDivElement>(null);
  const orientation = useScreenOrientation();
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
  }, [
    isLoadingCurrentForecastWeather,
    isLoadingCurrentWeekDaysForecastWeather,
    showSidebar,
    currentForecastWeather,
    currentWeekDaysForecastWeather,
    error,
    errorCurrentForecastWeather,
    errorCurrentWeekDaysForecastWeather,
    orientation,
  ]);

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

  useEffect(() => {
    const landscape =
      orientation === "landscape-primary" ||
      orientation === "landscape-secondary";

    if (landscape && showSidebar) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [orientation, showSidebar]);

  const toggleSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const startY = event.touches[0].clientY;
    const startX = event.touches[0].clientX;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const moveY = moveEvent.touches[0].clientY;
      const moveX = moveEvent.touches[0].clientX;
      const deltaY = moveY - startY;
      const deltaX = moveX - startX;

      if (
        sidebarToggleRef.current &&
        sidebarToggleRef.current.contains(moveEvent.target as Node)
      ) {
        if (deltaY < -40 && Math.abs(deltaY) > Math.abs(deltaX)) {
          dispatch(setShowSidebar(true));
          window.removeEventListener("touchmove", handleTouchMove);
        } else if (deltaY > 40 && Math.abs(deltaY) > Math.abs(deltaX)) {
          dispatch(setShowSidebar(false));
          window.removeEventListener("touchmove", handleTouchMove);
        }
      }
    };

    window.addEventListener("touchmove", handleTouchMove);
  };

  return (
    <div ref={appContainerRef} className={`app-container`} role="app-container">
      <div className="5xl:max-w-screen-5xl 5xl:mx-auto">
        <Header />
        <main>
          {error ? (
            <h1 className="my-y text-xl lg:my-10 lg:text-2xl">{error}</h1>
          ) : (
            <>
              <CurrentForecastWeatherSection />
              {!showSidebar && <WeekDaysForecastWeatherSection />}
              <div
                ref={sidebarToggleRef}
                className={`sidebar-toggle ${
                  errorCurrentForecastWeather && "hidden"
                } lg:hidden ${showSidebar && "open"}`}
                onClick={toggleSidebar}
                onTouchStart={handleTouchStart}
              >
                <FontAwesomeIcon icon={faAngleDoubleUp} size="lg" />
              </div>
              <Sidebar />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
