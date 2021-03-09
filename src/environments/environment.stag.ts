// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import * as enUS from '../assets/i18n/en-US.json';
import * as trTR from '../assets/i18n/tr-TR.json';

const SUPPORTED_LANGUAGES = [
  {'code': 'en-US', 'name': 'English', 'source': enUS},
  {'code': 'tr-TR', 'name': 'Türk'   , 'source': trTR},
];

export const environment = {
  production: true,
  pwa: false,
  version: "1.0.0",
  name: "stag",
  defaultLanguage: SUPPORTED_LANGUAGES[0].code,
  supportedLanguages: [
    SUPPORTED_LANGUAGES[0].code,
    SUPPORTED_LANGUAGES[1].code,
  ],
  supportedLanguageObjs: SUPPORTED_LANGUAGES
};
