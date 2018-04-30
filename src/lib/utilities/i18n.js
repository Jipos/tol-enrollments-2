import keys from 'lodash/keys';
import isEqual from 'lodash/isEqual';

const _dictionary = {}

const config = {
  availableLanguages: [],
  defaultLanguage: undefined
};

var language;

function getLanguageFromUrl() {
  // http://www.jquery4u.com/snippets/url-parameters-jquery/
  const results = new RegExp('[\\?&amp;]lang=([^&amp;#]*)').exec(window.location.href);
  return (results && results[1]) || undefined
}

function determineLanguage() {
  const language = getLanguageFromUrl();
  if (config.availableLanguages.indexOf(language) !== -1) {
    return language
  } else {
    console.log(`${language} is not a supported language. Using the default language '${config.defaultLanguage}' instead`);
    return config.defaultLanguage;
  }
}

export function translate (key) {
  const translations = _dictionary[key];
  if (translations) {
    return translations[language];
  } else {
    console.log(`Missing translation for ${key}`);
    return key;
  }
}

export function addDictionary (dictionary) {
  for (var key in dictionary) {
    var translations = dictionary[key];
    var languages = keys(translations)
    if (!isEqual(config.availableLanguages, languages)) {
      console.log(`The translations for key '${key}' cannot be added to the dictionary, because the wrong translations are found [${languages}] instead of [${config.availableLanguages}].`);
    } else if (_dictionary[key]) {
      console.log(`The translations for key '${key}' cannot be added to the dictionary, because it already contains translations for that key.`);
    } else {
      _dictionary[key] = translations
    }
  }
}

export function initializeI18n(options = {}) {
  if (!options.availableLanguages) {
    throw new Error('An array of available languages is required.');
  }
  if (!options.defaultLanguage) {
    throw new Error('An default languages is required.');
  }
  if (options.availableLanguages.indexOf(options.defaultLanguage) === -1) {
    throw new Error('The default language must be one of the available languages.');
  }
  config.defaultLanguage = options.defaultLanguage;
  config.availableLanguages = options.availableLanguages;
  language = determineLanguage();
}
