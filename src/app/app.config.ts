export class AppConfig {
  api: ApiConfig;
  firebase: FirebaseConfig;
  providersSocial: ProvidersSocial;
}

class ApiConfig {
  baseUrl: string = "http://webapi.com";
  notifyUrl: string = "http://webapi.com";
}

class FirebaseConfig {
  apiKey: "AIzaSyA66eBE0jgCC58YBWdqb_Em9dhOsWJ0msI";
  authDomain: "rao-vat-miraisoft.firebaseapp.com";
  databaseURL: "https://rao-vat-miraisoft.firebaseio.com";
  projectId: "rao-vat-miraisoft";
  storageBucket: "rao-vat-miraisoft.appspot.com";
  messagingSenderId: "843101426914";
  appId: "1:843101426914:web:b19540c64df2f9cfc73abb";
  measurementId: "G-BJXR586K2V"; 
}

class ProvidersSocial {
  GOOGLE: 'GOOGLE';
  FACEBOOK: 'FACEBOOK'
}