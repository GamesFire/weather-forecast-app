import { FC } from "react";
import CurrentLocation from "./currentLocation/CurrentLocation";
import CurrentDate from "./currentDate/CurrentDate";
import CurrentLanguage from "./currentLanguage/CurrentLanguage";

const LocationDetails: FC = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse justify-between text-location-details text-lg lg:text-xl 6xl:text-4xl">
      <div className="relative flex justify-between md:justify-start w-full md:w-auto mb-9 md:mb-0">
        <CurrentDate />
        <CurrentLanguage />
      </div>
      <CurrentLocation />
    </div>
  );
};

export default LocationDetails;
