import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./locales/english/translation.json"
import translationHI from "./locales/hindi/translation.json"
import translationES from "./locales/espanish/translation.json"
import translationFR from "./locales/french/translation.json"
import translationJA from "./locales/japanese/translation.json"

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      hi: { translation: translationHI },
      es: { translation: translationES },
      fr: { translation: translationFR },
      ja: { translation: translationJA }
    },
    lng: localStorage.getItem("language") || "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
