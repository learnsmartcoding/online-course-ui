export interface EnvironmentConfiguration {
    env_name: string;
    production: boolean;
    apiUrl: string;
    apiEndpoints: {
        userProfile: string;      
    },
    adb2cConfig: {
        clientId: string;
        readScopeUrl: string;
        scopeUrls:string[];
        writeScopeUrl: string;
        apiEndpointUrl: string;
    }
    cacheTimeInMinutes: number;
}