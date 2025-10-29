import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './english';
import ar from './arabic';
function Languages(language: string): void {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: {
          translation: en,
        },
        ar: {
          translation: ar,
        }
      },
      lng: language || 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
}
export default Languages;