

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Import your translation files
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';

const resources = {
    en: {
        translation: translationEN
    },
    fr: {
        translation: translationFR
    }
};


i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(HttpApi)
    .init({
        resources,
        fallbackLng: 'en',
        detection: {
            order: ['path', 'cookie', 'htmlTag'],
            caches: ['cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;


