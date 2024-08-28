// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "../app/models/environment-configuration";


const serverUrl='https://lsc-expensetracker-api.azurewebsites.net/api';


// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adb2cConfig: {
    clientId: '2b9d74de-7aad-402c-b912-b653574516ee',
    readScopeUrl: 'https://karthiktechworld.onmicrosoft.com/expensetracker/api/Expense.Read',
    writeScopeUrl: 'https://karthiktechworld.onmicrosoft.com/expensetracker/api/Expense.Write',
    scopeUrls:[
      'https://karthiktechworld.onmicrosoft.com/expensetracker/api/Expense.Read',
      'https://karthiktechworld.onmicrosoft.com/expensetracker/api/Expense.Write'
    ],
    apiEndpointUrl: 'https://lsc-expensetracker-api.azurewebsites.net/api'
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
