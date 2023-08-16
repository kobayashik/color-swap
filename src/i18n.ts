import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      convert: 'Convert',
      copy: 'Copy',
      copied: 'Copied',
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
    },
  },
  fr: {
    translation: {
      convert: 'Convertir',
      copy: 'Copie',
      copied: 'Copié',
      hex: 'HEX',
      rgb: 'RGB',
      hsl: 'HSL',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
