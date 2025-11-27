import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { siteConfig } from "@/config/site.config";

// Base translations (reusable across projects)
import baseEn from "./locales/base/en.json";
import baseEs from "./locales/base/es.json";

// App-specific translations
import appEn from "./locales/en.json";
import appEs from "./locales/es.json";

// Merge base translations with app-specific ones
const resources = {
  en: { translation: { ...baseEn, ...appEn } },
  es: { translation: { ...baseEs, ...appEs } },
};

const savedLanguage = localStorage.getItem(siteConfig.storage.language);
const browserLanguage = navigator.language.split("-")[0];
const supportedLanguages = siteConfig.languages.map((l) => l.code);
const defaultLanguage =
  savedLanguage || (supportedLanguages.includes(browserLanguage) ? browserLanguage : "en");

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem(siteConfig.storage.language, lng);
});

export default i18n;
