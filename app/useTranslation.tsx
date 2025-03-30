import { useState } from "react";
import { defaultLanguage, languages } from "./translations/utils";

export const useTranslation = () => {
  const [language, setLanguage] = useState(defaultLanguage);
  const json =
    languages.find((val) => val.value === language)?.json ?? languages[0].json;

  // Типизация для объекта валидации
  type ValidationKeys = 'required' | 'signatureRequired' | 'agreementRequired' | 'formErrors';
  type ValidationLanguages = 'en' | 'ru' | 'sk';
  
  const validation: Record<ValidationLanguages, Record<ValidationKeys, string>> = {
    en: {
      required: "This field is required",
      signatureRequired: "Signature is required",
      agreementRequired: "You must agree to continue",
      formErrors: "Please fix all errors before submitting"
    },
    ru: {
      required: "Это поле обязательно для заполнения",
      signatureRequired: "Необходима подпись",
      agreementRequired: "Вы должны согласиться, чтобы продолжить",
      formErrors: "Пожалуйста, исправьте все ошибки перед отправкой"
    },
    sk: {
      required: "Toto pole je povinné",
      signatureRequired: "Podpis je povinný",
      agreementRequired: "Musíte súhlasiť, aby ste mohli pokračovať",
      formErrors: "Pred odoslaním opravte všetky chyby"
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let translation: any;

    // Если это ключ валидации, используем объект валидации
    if (keys[0] === "validation" && keys.length > 1) {
      const validationKey = keys[1] as ValidationKeys;
      const langKey = language as ValidationLanguages;
      translation = validation[langKey]?.[validationKey];
    } else {
      // Используем обычные тексты из translations
      translation = keys.reduce((obj, key) => obj?.[key], json as Record<string, any>);
    }

    // Если перевод не найден, пробуем найти в английской версии
    if (!translation) {
      if (keys[0] === "validation" && keys.length > 1) {
        const validationKey = keys[1] as ValidationKeys;
        translation = validation.en[validationKey];
      } else {
        const defaultJson = languages[0].json as Record<string, any>;
        translation = keys.reduce((obj, key) => obj?.[key], defaultJson);
      }
    }

    // Если всё равно нет перевода, возвращаем ключ
    return String(translation || key);
  };

  return { t, language, setLanguage };
};
