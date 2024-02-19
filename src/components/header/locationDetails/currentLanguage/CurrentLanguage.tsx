import { FC, useState } from "react";
import { Language } from "@/types/language";
import { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import i18n from "@/i18n";
import {
  ILoadOptions,
  dropdownCustomCurrentLocationStyles,
} from "./dropdownCustomCurrentLanguageStyles";
import { setCurrentLanguage } from "@/store/reducers/slices/currentLanguageSlice";
import Select, { SingleValue } from "react-select";
import "../styles/dropdown.css";

const CurrentLanguage: FC = () => {
  const { currentLanguage } = useAppSelector(
    (state: RootState) => state.currentLanguageReducer
  );
  const dispatch = useAppDispatch();

  const [isDropdownLanguageVisible, setIsDropdownLanguageVisible] =
    useState<boolean>(false);

  const handleLanguageClick = () => {
    setIsDropdownLanguageVisible(!isDropdownLanguageVisible);
  };

  const handleLanguageOnChange = (newValue: SingleValue<ILoadOptions>) => {
    if (newValue) {
      const newLanguage = newValue.value;
      dispatch(setCurrentLanguage(newLanguage as Language));
      i18n.changeLanguage(newLanguage);
      setIsDropdownLanguageVisible(false);
    }
  };

  const supportedLanguages = i18n.options?.supportedLngs
    ? (i18n.options.supportedLngs.filter(
        (lng: string) => lng !== "cimode"
      ) as Language[])
    : [];

  const languageOptions: ILoadOptions[] = supportedLanguages.map((lng) => ({
    value: lng,
    label: lng.toUpperCase(),
  }));

  const selectedOption = languageOptions.find(
    (option) => option.value === currentLanguage
  );

  return (
    <div className="current-container md:min-w-10 md:ml-5">
      <div className="current-value" onClick={handleLanguageClick}>
        <span>{currentLanguage.toUpperCase()}</span>{" "}
        <span
          className={`dropdown-icon ${
            isDropdownLanguageVisible ? "active" : ""
          }`}
        >
          &#9660;
        </span>
      </div>
      {isDropdownLanguageVisible && (
        <div className="dropdown-container">
          <Select
            styles={dropdownCustomCurrentLocationStyles}
            options={languageOptions}
            value={selectedOption}
            onChange={handleLanguageOnChange}
            isSearchable={false}
            hideSelectedOptions={true}
            menuIsOpen={true}
            components={{
              Control: () => null,
              ValueContainer: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CurrentLanguage;
