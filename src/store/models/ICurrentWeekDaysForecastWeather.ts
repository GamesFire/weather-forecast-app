import { IWeather } from "./IWeather";

interface IMain {
  temp: number;
}

export interface IList {
  main: IMain;
  weather: IWeather[];
  dt_txt: string;
}

export interface ICurrentWeekDaysForecastWeather {
  cod: string;
  message: number;
  list: IList[];
}
