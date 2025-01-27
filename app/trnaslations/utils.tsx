import translationEN from "./translationEN.json";
import translationRU from "./translationRU.json";
import translationSK from "./translationSK.json";

export interface ILang {
  label: string;
  value: string;
  json: Record<string, any>;
}

export const defaultLanguage = "sk";

export const languages = [
  { label: "English", value: "en", json: translationEN },
  { label: "Slovenský", value: "sk", json: translationSK },
  { label: "Русский", value: "ru", json: translationRU },
];
