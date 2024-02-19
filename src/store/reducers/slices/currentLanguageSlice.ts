import { Language } from "@/types/language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface CurrentLanguageState {
  currentLanguage: Language;
}

const defaultLanguage = (Cookies.get("i18next") || "en") as Language;

const initialState: CurrentLanguageState = {
  currentLanguage: defaultLanguage,
};

export const currentLanguageSlice = createSlice({
  name: "currentLanguage",
  initialState,
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<Language>) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { setCurrentLanguage } = currentLanguageSlice.actions;

export default currentLanguageSlice.reducer;
