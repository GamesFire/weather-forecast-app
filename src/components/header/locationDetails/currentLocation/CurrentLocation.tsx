import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import { AsyncPaginate } from "react-select-async-paginate";
import { setCurrentGeolocation } from "@/store/reducers/slices/currentGeolocationSlice";
import { fetchLocation } from "@/api/fetchLocation";
import { SingleValue } from "react-select";
import {
  ILoadOptions,
  dropdownCustomCurrentLocationStyles,
} from "./dropdownCustomCurrentLocationStyles";
import "../styles/dropdown.css";
import { useTranslation } from "react-i18next";

const CurrentLocation: FC = () => {
  const { t } = useTranslation("translation");
  const { currentLanguage } = useAppSelector(
    (state: RootState) => state.currentLanguageReducer
  );
  const { countryCode, city } = useAppSelector(
    (state: RootState) => state.currentGeolocationReducer
  );
  const { showSidebar } = useAppSelector(
    (state: RootState) => state.showSidebarReducer
  );

  const [isDropdownLocationVisible, setIsDropdownLocationVisible] =
    useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState<ILoadOptions | null>(
    null
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsDropdownLocationVisible(false);
  }, [currentLanguage, showSidebar]);

  const loadOptions = async (inputValue: string) => {
    const response = await fetchLocation({
      latitude: null,
      longitude: null,
      namePrefix: inputValue,
      languageCode: currentLanguage,
    });

    if (!response) {
      return { options: [] };
    }

    return {
      options: response.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.countryCode} - ${city.name}`,
        };
      }),
    };
  };

  const handleLocationClick = () => {
    if (!showSidebar) {
      setIsDropdownLocationVisible(!isDropdownLocationVisible);
    }
  };

  const handleLocationOnChange = (newValue: SingleValue<ILoadOptions>) => {
    if (newValue === null) {
      setSearchLocation(null);
      dispatch(
        setCurrentGeolocation({
          countryCode: t("header.location.country_code_unknown"),
          city: t("header.location.city_unknown"),
          latitude: null,
          longitude: null,
        })
      );
      return;
    }

    const { value, label } = newValue;
    const [latitudeStr, longitudeStr] = value.split(" ");
    const [latitude, longitude] = [
      parseFloat(latitudeStr),
      parseFloat(longitudeStr),
    ];
    const [countryCode, city] = label.split(" - ");

    setSearchLocation(newValue);

    dispatch(
      setCurrentGeolocation({
        countryCode: countryCode,
        city: city,
        latitude: latitude,
        longitude: longitude,
      })
    );

    setIsDropdownLocationVisible(!isDropdownLocationVisible);
  };

  return (
    <div className="current-container min-w-52 md:min-w-64">
      <div className="current-value" onClick={handleLocationClick}>
        <span>
          {countryCode} - {city}
        </span>
        <span
          className={`dropdown-icon ${
            isDropdownLocationVisible ? "active" : ""
          }`}
        >
          &#9660;
        </span>
      </div>
      {isDropdownLocationVisible && (
        <div className="dropdown-container">
          <AsyncPaginate
            styles={dropdownCustomCurrentLocationStyles}
            value={searchLocation}
            placeholder={t("header.location.placeholder")}
            debounceTimeout={1000}
            onChange={handleLocationOnChange}
            loadOptions={loadOptions}
            loadingMessage={() => `${t("loader.loading_message")}`}
            noOptionsMessage={() => `${t("header.location.no_option_message")}`}
            blurInputOnSelect={true}
            closeMenuOnSelect={true}
            maxMenuHeight={100}
            hideSelectedOptions={true}
          />
        </div>
      )}
    </div>
  );
};

export default CurrentLocation;
