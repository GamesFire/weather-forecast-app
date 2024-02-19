import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend)
  .init<HttpBackendOptions>({
    supportedLngs: ["en", "uk", "ru", "es", "fr"],
    fallbackLng: "en",
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "path",
        "localStorage",
        "subdomain",
        "navigator",
      ],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

export default i18n;
