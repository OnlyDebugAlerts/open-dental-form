import { useState } from "react";
import { defaultLanguage, languages } from "./translations/utils";

export const useTranslation = () => {
  const [language, setLanguage] = useState(defaultLanguage);
  const json =
    languages.find((val) => val.value === language)?.json ?? languages[0].json;

  const t = (path: string) => {
    try {
      const keys = path.split(".");
      const res = keys.reduce((acc: Record<string, any> | string, key) => {
        if (typeof acc === "string" || !acc) {
          return acc || key;
        }
        return acc[key] ?? key;
      }, json as Record<string, any>);

      return res as string;
    } catch (error) {
      console.error(`Translation error for path: ${path}`, error);
      return path;
    }
  };

  return { t, language, setLanguage };
};
