import _ from 'underscore';

var language;

const dictionary = {}

function getLanguageFromUrl() {
  // http://www.jquery4u.com/snippets/url-parameters-jquery/
  const results = new RegExp('[\\?&amp;]lang=([^&amp;#]*)').exec(window.location.href);
  return (results && results[1]) || undefined
}

function determineLanguage() {
  const language = getLanguageFromUrl();
  if (config.debug && !language) {
    console.log(`No language was specified. Using the default: ${config.defaultLanguage}`);
  } else if (config.debug && config.availableLanguages.indexOf(language) === -1) {
    console.log(`${language} is not a supported language. Using the default: ${config.defaultLanguage}`);
  }
  return config.availableLanguages.indexOf(language) !== -1 ? language : config.defaultLanguage;
}

const getLanguage = function() {
  if (!language) {
    language = determineLanguage();
  }
  return language;
};

// Translate the specified key.
export function translate (key) {
  const translation = dictionary[key];
  const language = getLanguage();
  if (translation) {
    return translation[language];
  } else {
    if (config.debug) {
      console.log(`Missing translation for ${key}`);
    }
    return key;
  }
}

// Add translations to the dictionary.
// The added translations must contain translations for all available languages.
// If a translation for a language is missing for a key the dictionary, that key
// isn't added to the global dictionary.
// The translations argument is expected to have the following format:
//   {
//     welcome: {
//       nl: 'Welkom',
//       en: 'Welcome'
//     }
//     ...
//   }
export function addTranslations (translations) {
  for (var key in translations) {
    var translation = translations[key];
    var languages = _.keys(translation)
    if (config.debug && !_.isEqual(config.availableLanguages, languages)) {
      console.log(`The translations for key '${key}' cannot be added to the dictionary, because the wrong translations are found [${languages}] instead of [${config.availableLanguages}].`);
    } else if (config.debug && dictionary[key]) {
      console.log(`The translations for key '${key}' cannot be added to the dictionary, because it already contains translations for that key.`);
    } else {
      dictionary[key] = translation
    }
  }
}

// The default configuration
const config = {
  availableLanguages: ['en'],
  defaultLanguage: 'en',
  debug: false
}

// Customize this i18n module.
// The following customizations are possible:
// * availableLanguages (Array[String]): the available languages
// * defaultLanguage (String): the default language
// * debug (Boolean): flag indicating whether debug logging is enabled
export function customize(options = {}) {
  const availableLanguages = options.availableLanguages || config.availableLanguages;
  const defaultLanguage = options.defaultLanguage || config.defaultLanguage;
  if (availableLanguages.indexOf(defaultLanguage) === -1) {
    throw new Error('The default language must be one of the available languages.');
  }
  config.defaultLanguage = defaultLanguage;
  config.availableLanguages = availableLanguages;
  config.debug = options.debug || false;
}
