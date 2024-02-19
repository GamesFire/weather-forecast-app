import { IWeather } from "./IWeather";

interface ISys {
  id: number;
  country: string;
}

interface IClouds {
  all: number;
}

interface IWind {
  speed: number;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ICord {
  lon: number;
  lat: number;
}

export interface ICurrentForecastWeather {
  cod: string;
  message: number;
  id: number;
  name: string;
  cord: ICord;
  weather: IWeather[];
  main: IMain;
  wind: IWind;
  clouds: IClouds;
  sys: ISys;
}
