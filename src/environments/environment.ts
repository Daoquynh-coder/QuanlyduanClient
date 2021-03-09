// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import * as enUS from "../assets/i18n/en-US.json";

const SUPPORTED_LANGUAGES = [{ code: "en-US", name: "English", source: enUS }];

export const environment = {
  production: false,
  pwa: false,
  version: "",
  name: "dev",
  defaultLanguage: SUPPORTED_LANGUAGES[0].code,
  supportedLanguages: [SUPPORTED_LANGUAGES[0].code],
  supportedLanguageObjs: SUPPORTED_LANGUAGES,
  firebase: {
    apiKey: "AIzaSyAr4HQt8zKnLkvBmWOkKJ4YF0AxA1u5yoc",
    authDomain: "muanhabandat-vn.firebaseapp.com",
    projectId: "muanhabandat-vn",
    storageBucket: "muanhabandat-vn.appspot.com",
    messagingSenderId: "169968208774",
    appId: "1:169968208774:web:ccbda2d4f80e81c4f7fa07",
    measurementId: "G-JTEBQX4P7W",
  },
  providersSocial: {
    GOOGLE: "GOOGLE",
    FACEBOOK: "FACEBOOK",
  },
  apiUrl: "http://192.168.1.111/api/",
};
