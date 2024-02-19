import { IWeather } from "@/store/models/IWeather";

interface WeatherIcons {
  [key: string]: string;
}

export const getWeatherIconName = (weather: IWeather | undefined): string => {
  if (!weather) {
    return "wi-unknown";
  }

  const { icon } = weather;
  let { main } = weather;

  if (main === "Clear") {
    main += icon.charAt(icon.length - 1).toUpperCase();
  }

  if (main === "Clouds") {
    if (icon.includes("02")) {
      main += icon.charAt(icon.length - 1).toUpperCase();
    }
  }

  const weatherIcons: WeatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-drizzle",
    Rain: "wi-rain",
    Snow: "wi-snow",
    Mist: "wi-mist-and-haze",
    Smoke: "wi-smoke",
    Haze: "wi-mist-and-haze",
    Dust: "wi-dust",
    Fog: "wi-fog",
    Sand: "wi-sand",
    Ash: "wi-ash",
    Squall: "wi-squall",
    Tornado: "wi-tornado",
    ClearD: "wi-day-sunny",
    ClearN: "wi-night-clear",
    Clouds: "wi-clouds",
    CloudsD: "wi-day-cloudy",
    CloudsN: "wi-night-alt-cloudy",
  };

  return weatherIcons[main] || "wi-unknown";
};
