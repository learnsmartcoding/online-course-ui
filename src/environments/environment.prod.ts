// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "../app/models/environment-configuration";


const serverUrl='https://smartlearnbykarthik-api.azurewebsites.net/api';


// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adb2cConfig: {
    chatHubUrl: 'https://smartlearnbykarthik-api.azurewebsites.net/chathub', // Correct URL
    clientId: '41883d3b-2145-4abe-ab65-e2bee701d162',
    readScopeUrl: 'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/prod/api/User.Read',
    writeScopeUrl: 'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/prod/api/User.Write',
    scopeUrls:[
      'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/prod/api/User.Write',
      'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/prod/api/User.Write'
    ],
    apiEndpointUrl: 'https://smartlearnbykarthik-api.azurewebsites.net/api'
  },
  cacheTimeInMinutes: 30,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
