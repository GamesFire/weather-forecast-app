import { FC } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { setCurrentUnits } from "@/store/reducers/slices/currentUnitsSlice";
import "./unitsToggle.css";

const UnitsToggle: FC = () => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentUnits = event.target.checked ? "imperial" : "metric";
    dispatch(setCurrentUnits(currentUnits));
  };

  return (
    <div className="flex justify-center items-center mt-5 md:mt-10">
      <div className="text-xl 6xl:text-2xl">
        <div className="switch-button">
          <input
            id="units-toggle"
            className="switch-button-checkbox"
            type="checkbox"
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
