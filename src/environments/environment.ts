// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "../app/models/environment-configuration";


const serverUrl='https://localhost:7005/api';


// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adb2cConfig: {
    chatHubUrl: 'https://localhost:7005/chathub', // Correct URL
    clientId: '5212f2c7-60a9-46ad-bcbb-3f5dc9af3dab',
    readScopeUrl: 'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/dev/api/User.Read',
    writeScopeUrl: 'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/dev/api/User.Write',
    scopeUrls:[
      'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/dev/api/User.Read',
      'https://smartlearnbykarthik.onmicrosoft.com/smartlearnbykarthik/dev/api/User.Write'
    ],
    apiEndpointUrl: 'https://localhost:7005/api'
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
