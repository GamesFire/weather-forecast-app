import i18next from "i18next";
import { Dispatch } from "redux";
import type { RootState } from "@/store/store";
import type { ILocation } from "@/store/models/ILocation";
import { store } from "@/main";
import { fetchLocation } from "@/api/fetchLocation";
import { setCurrentGeolocation } from "@/store/reducers/slices/currentGeolocationSlice";

export const getLocation = async (dispatch: Dispatch): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const state: RootState = store.getState();
    const { countryCode, city, latitude, longitude } =
      state.currentGeolocationReducer;

    if (!countryCode || !city) {
      dispatch(
        setCurrentGeolocation({
          countryCode: `${i18next.t("header.location.country_code_unknown")}`,
          city: `${i18next.t("header.location.city_unknown")}`,
          latitude: null,
          longitude: null,
        })
      );
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { currentLanguage } = state.currentLanguageReducer;
          const { latitude: positionLatitude, longitude: positionLongitude } =
            position.coords;

          try {
            let response: ILocation | undefined;

            if (!latitude || !longitude) {
              response = await fetchLocation({
                latitude: positionLatitude,
                longitude: positionLongitude,
                namePrefix: null,
                languageCode: currentLanguage,
              });
            } else {
              response = await fetchLocation({
                latitude,
                longitude,
                namePrefix: null,
                languageCode: currentLanguage,
              });
            }

            const newCountryCode =
              response?.data[0]?.countryCode ??
              i18next.t("header.location.country_code_unknown");
            const newCity =
              response?.data[0]?.city ??
              i18next.t("header.location.city_unknown");
            const newLatitude = response?.data[0].latitude ?? null;
            const newLongitude = response?.data[0].longitude ?? null;

            dispatch(
              setCurrentGeolocation({
                countryCode: newCountryCode,
                city: newCity,
                latitude: newLatitude,
                longitude: newLongitude,
              })
            );

            resolve();
          } catch (error) {
            if (error instanceof Error) {
              console.error("Error fetching location:", error.message);
            } else {
              console.error("Unknown error occurred:", error);
            }
            reject(error);
          }
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error.message);
          reject(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
      reject(new Error(`${i18next.t("errors.geo_not_supported")}`));
    }
  });
};
