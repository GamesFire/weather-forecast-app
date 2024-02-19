/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV_LOCATION_API_APP_ID_KEY: string;
  readonly VITE_ENV_WEATHER_API_APP_ID_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
