import { FC } from "react";
import LocationDetails from "./locationDetails/LocationDetails";
import UnitsToggle from "./unitsToggle/UnitsToggle";

const Header: FC = () => {
  return (
    <header className="p-3 lg:p-5">
      <LocationDetails />
      <UnitsToggle />
    </header>
  );
};

export default Header;
