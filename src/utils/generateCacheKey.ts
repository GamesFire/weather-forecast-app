import { store } from "@/main";
import { RootState } from "@/store/store";

export const generateCacheKey = (): string => {
  const state: RootState = store.getState();
  const { latitude, longitude } = state.currentGeolocationReducer;
  const currentUnits = state.currentUnitsReducer.currentUnits;
  const currentLanguage = state.currentLanguageReducer.currentLanguage;

  return `${latitude}_${longitude}:${currentUnits}_${currentLanguage}`;
};
