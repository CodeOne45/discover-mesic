var en = require("./translations.en.json");
var fr = require("./translations.fr.json");

const i18n = {
  translations: {
    en: en.i18n,
    fr: fr.i18n,
  },
  defaultLang: "en",
  useBrowserDefault: false,
};

module.exports = i18n;