import { ICurrentGeolocation } from "./ICurrentGeolocation";
import { Units } from "@/types/units";
import { Language } from "@/types/language";

export interface ICurrentRequestParams {
  currentGeolocation: ICurrentGeolocation;
  currentUnits: Units;
  currentLanguage: Language;
}
