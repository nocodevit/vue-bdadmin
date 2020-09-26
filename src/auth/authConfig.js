// Config object to be passed to Msal on creation.
// For a full list of msal.js configuration parameters, 
// visit https://azuread.github.io/microsoft-authentication-library-for-js/docs/msal/modules/_authenticationparameters_.html
export const msalConfig = {
    auth: {
        clientId: "c369bb11-23dd-438d-9567-a232590b5231",
        authority: "https://login.microsoftonline.com/26c95fb7-1bfd-44ae-8f94-3397ce16f213",
        redirectUri: "https://localhost:8080/" //"https://localhost:8081/#dashboard",
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {	
                    return;	
                }	
                switch (level) {	
                    case msal.LogLevel.Error:	
                        console.error(message);	
                        return;	
                    case msal.LogLevel.Info:	
                        console.info(message);	
                        return;	
                    case msal.LogLevel.Verbose:	
                        console.debug(message);	
                        return;	
                    case msal.LogLevel.Warning:	
                        console.warn(message);	
                        return;	
                }
            }
        }
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};

// Add here scopes for access token to be used at MS Graph API endpoints.
export const tokenRequest = {
    scopes: ["User.Read", "Mail.Read","Sites.Read.All"],
    forceRefresh: false // set this to "true" if you would like to skip a cached token and go to the server
};
