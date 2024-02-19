import axios, { AxiosResponse } from "axios";
import { ILocation } from "@/store/models/ILocation";
import {
  BASE_LOCATION_API_URL,
  LOCATION_API_APP_HOST,
  LOCATION_API_APP_ID_KEY,
} from "@/constants/api";
import type { Language } from "@/types/language";

interface FetchLocationParameters {
  latitude: number | null;
  longitude: number | null;
  namePrefix: string | null;
  languageCode: Language;
}

export const fetchLocation = async ({
  latitude,
  longitude,
  namePrefix,
  languageCode,
}: FetchLocationParameters): Promise<ILocation | undefined> => {
  try {
    const headers = {
      "X-RapidAPI-Key": LOCATION_API_APP_ID_KEY,
      "X-RapidAPI-Host": LOCATION_API_APP_HOST,
    };

    const params: Record<string, string> = { languageCode };

    if (namePrefix !== null) {
      params.namePrefix = namePrefix;
    } else if (latitude !== null && longitude !== null) {
      params.location = `${latitude > 0 ? "+" : ""}${latitude}${
        longitude > 0 ? "+" : ""
      }${longitude}`;
    } else {
      return undefined;
    }

    if (languageCode === "uk") {
      params.languageCode = "ru";
    }

    const response: AxiosResponse<ILocation> = await axios.get<ILocation>(
      `${BASE_LOCATION_API_URL}/cities`,
      { headers, params }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching location:", error);
    return undefined;
  }
};
