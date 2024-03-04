import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setCurrentUnits } from "@/store/reducers/slices/currentUnitsSlice";
import Cookies from "js-cookie";
import "./unitsToggle.css";
import type { RootState } from "@/store/store";

const UnitsToggle: FC = () => {
  const { currentUnits } = useAppSelector(
    (state: RootState) => state.currentUnitsReducer
  );
  const imperial = currentUnits === "imperial";
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Cookies.get("units")) {
      Cookies.set("units", "metric");
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUnits = event.target.checked ? "imperial" : "metric";
    dispatch(setCurrentUnits(newUnits));
    Cookies.set("units", newUnits);
  };

  return (
    <div className="flex justify-center items-center mt-5 md:mt-10">
      <div className="text-xl 6xl:text-2xl">
        <div className="switch-button">
          <input
            id="units-toggle"
            className="switch-button-checkbox"
            type="checkbox"
            checked={imperial}
            onChange={handleChange}
          />
          <label className="switch-button-label" htmlFor="units-toggle">
            <span className="switch-button-label-span">&deg;C</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UnitsToggle;
