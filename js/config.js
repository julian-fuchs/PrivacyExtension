const chromeConfig = {
    network: {
        networkPredictionEnabled: {
            info: 'During startup and browsing domain names are getting pre-resolved. This ranges from sites you currently visit to pages you might look up later, or some of the suggested URL while typing. Therefore your browsing habbits are getting passed as information.',
            recommendedValue: false,
            warningLevel: 'high'
        }
        // TODO: currently only TRUE/FALSE settings supported
        // webRTCIPHandlingPolicy: {
        //     info: 'WebRTC helps with the real-time-communication, but is known for leaking your local address depending on usage. Therefore use it with caution.',
        //     recommendedValue: false,
        //     warningLevel: 'high'
        // }
    },
    services: {
        alternateErrorPagesEnabled: {
            info: 'If enabled, Chrome uses a web service to help resolve navigation errors. This preference\'s value is a boolean, defaulting to true',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillAddressEnabled: {
            info: 'If enabled, Chrome offers to automatically fill in addresses and other form data. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillEnabled: {
            info: 'If enabled, Chrome offers to automatically fill in forms. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillCreditCardEnabled: {
            info: 'If enabled, Chrome offers to automatically fill in credit card forms. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        passwordSavingEnabled: {
            info: 'If enabled, the password manager will ask if you want to save passwords. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingEnabled: {
            info: 'If enabled, Chrome does its best to protect you from phishing and malware. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: true,
            warningLevel: 'high'
        },
        safeBrowsingExtendedReportingEnabled: {
            info: 'If enabled, Chrome will send additional information to Google when SafeBrowsing blocks a page, such as the content of the blocked page. This preference\'s value is a boolean, defaulting to false.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        searchSuggestEnabled: {
            info: 'If enabled, Chrome sends the text you type into the Omnibox to your default search engine, which provides predictions of websites and searches that are likely completions of what you\'ve typed so far. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'medium'
        },
        spellingServiceEnabled: {
            info: 'If enabled, Chrome uses a web service to help correct spelling errors. This preference\'s value is a boolean, defaulting to false.',
            recommendedValue: false,
            warningLevel: 'medium'
        },
        translationServiceEnabled: {
            info: 'If enabled, Chrome offers to translate pages that aren\'t in a language you read. This preference\'s value is a boolean, defaulting to true.',
            recommendedValue: false,
            warningLevel: 'medium'
        }
    },
    websites: {
        doNotTrackEnabled: {
            info: 'If enabled, Chrome sends \'Do Not Track\' (DNT: 1) header with your requests. The value of this preference is of type boolean, and the default value is false.',
            recommendedValue: true,
            warningLevel: 'medium'
        },
        hyperlinkAuditingEnabled: {
            info: 'If enabled, Chrome sends auditing pings when requested by a website (<a ping>). The value of this preference is of type boolean, and the default value is true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        privacySandboxEnabled: {
            info: 'If enabled, the experimental Privacy Sandbox features are active. The value of this preference is of type boolean, and the default value is true.',
            recommendedValue: true,
            warningLevel: 'high'
        },
        protectedContentEnabled: {
            info: 'If enabled, Chrome provides a unique ID to plugins in order to run protected content. The value of this preference is of type boolean, and the default value is true.',
            recommendedValue: false,
            warningLevel: 'medium'
        },
        referrersEnabled: {
            info: 'If enabled, Chrome sends referer headers with your requests. Yes, the name of this preference doesn\'t match the misspelled header. No, we\'re not going to change it. The value of this preference is of type boolean, and the default value is true.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        thirdPartyCookiesAllowed: {
            info: 'If disabled, Chrome blocks third-party sites from setting cookies. The value of this preference is of type boolean, and the default value is true.',
            recommendedValue: false,
            warningLevel: 'medium'
        }
    }
};

// source: https://owasp.org/www-project-secure-headers/#div-headers
const securityHeaders = {
    "content-security-policy": {
        warningLevel: 'high',
        info: 'CSP prevents a wide range of attacks, including cross-site scripting and other cross-site injections.'
    },
    "permissions-policy": {
        warningLevel: 'medium',
        info: 'HTTP header can be used in the response (server to client) to communicate the permissions policy that should be enforced by the client.'
    },
    "referrer-policy": {
        warningLevel: 'high',
        info: 'Header governs which referrer information, sent in the Referer header, should be included with requests made.'
    },
    "strict-transport-security": {
        warningLevel: 'high',
        info: 'Header protects websites against protocol downgrade attacks and cookie hijacking. It allows web servers to declare that clients should only interact with it using secure HTTPS connections, and never via the insecure HTTP protocol.'
    },
    "x-content-type-options": {
        warningLevel: 'medium',
        info: 'Header will prevent the browser from interpreting files as a different MIME type to what is specified in the Content-Type HTTP header'
    },
    "x-frame-options": {
        warningLevel: 'high',
        info: 'Protection of web applications against clickjacking. It instructs the browser whether the content can be displayed within frames.'
    },
    "x-permitted-cross-domain-policies": {
        warningLevel: 'high',
        info: 'A cross-domain policy file is an XML document that grants a web client permission to handle data across domains'
    }
};

// source: https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes
const cookieAttributes = {
    hostOnly: {
        warningLevel: 'high',
        info: 'This attribute prevents that the cookie is handled by other domains than the origin domain. The browser will send this cookie only to the domain that firstly sent it to the browser.'
    },
    httpOnly: {
        warningLevel: 'high',
        info: 'This attribute prevents attacks such as session leakage, since it does not allow the cookie to be accessed via a client-side script such as JavaScript.'
    },
    sameSite: {
        warningLevel: 'high',
        info: 'This attribute  used to assert that a cookie ought not to be sent along with cross-site requests. This feature allows the server to mitigate the risk of cross-origin information leakage. In some cases, it is used to prevent cross-site request forgery attacks.'
    },
    secure: {
        warningLevel: 'high',
        info: 'This attributes tells the browser to only send the cookie if the connection is HTTPS. This protects the cookie from being passed in unencrypted requests.'
    }
};

const profiles = {
    default: {
        // defaults from https://developer.chrome.com/docs/extensions/reference/privacy/
        networkPredictionEnabled: true,
        alternateErrorPagesEnabled: true,
        autofillAddressEnabled: true,
        autofillEnabled: true,
        autofillCreditCardEnabled: true,
        passwordSavingEnabled: true,
        safeBrowsingEnabled: true,
        safeBrowsingExtendedReportingEnabled: false,
        searchSuggestEnabled: true,
        spellingServiceEnabled: false,
        translationServiceEnabled: true,
        doNotTrackEnabled: false,
        hyperlinkAuditingEnabled: true,
        privacySandboxEnabled: true,
        protectedContentEnabled: true,
        referrersEnabled: true,
        thirdPartyCookiesAllowed: true
    },
    low: {
        networkPredictionEnabled: false,
        alternateErrorPagesEnabled: false,
        autofillAddressEnabled: false,
        autofillEnabled: false,
        autofillCreditCardEnabled: false,
        passwordSavingEnabled: false,
        safeBrowsingEnabled: true,
        safeBrowsingExtendedReportingEnabled: false,
        searchSuggestEnabled: true,
        spellingServiceEnabled: true,
        translationServiceEnabled: true,
        doNotTrackEnabled: false,
        hyperlinkAuditingEnabled: false,
        privacySandboxEnabled: false,
        protectedContentEnabled: true,
        referrersEnabled: true,
        thirdPartyCookiesAllowed: true
    },
    medium: {
        networkPredictionEnabled: false,
        alternateErrorPagesEnabled: false,
        autofillAddressEnabled: false,
        autofillEnabled: false,
        autofillCreditCardEnabled: false,
        passwordSavingEnabled: false,
        safeBrowsingEnabled: true,
        safeBrowsingExtendedReportingEnabled: false,
        searchSuggestEnabled: true,
        spellingServiceEnabled: true,
        translationServiceEnabled: true,
        doNotTrackEnabled: false,
        hyperlinkAuditingEnabled: false,
        privacySandboxEnabled: true,
        protectedContentEnabled: true,
        referrersEnabled: false,
        thirdPartyCookiesAllowed: true
    },
    strict: {
        networkPredictionEnabled: chromeConfig.network.networkPredictionEnabled.recommendedValue,
        alternateErrorPagesEnabled: chromeConfig.services.alternateErrorPagesEnabled.recommendedValue,
        autofillAddressEnabled: chromeConfig.services.autofillAddressEnabled.recommendedValue,
        autofillEnabled: chromeConfig.services.autofillEnabled.recommendedValue,
        autofillCreditCardEnabled: chromeConfig.services.autofillCreditCardEnabled.recommendedValue,
        passwordSavingEnabled: chromeConfig.services.passwordSavingEnabled.recommendedValue,
        safeBrowsingEnabled: chromeConfig.services.safeBrowsingEnabled.recommendedValue,
        safeBrowsingExtendedReportingEnabled: chromeConfig.services.safeBrowsingExtendedReportingEnabled.recommendedValue,
        searchSuggestEnabled: chromeConfig.services.searchSuggestEnabled.recommendedValue,
        spellingServiceEnabled: chromeConfig.services.spellingServiceEnabled.recommendedValue,
        translationServiceEnabled: chromeConfig.services.translationServiceEnabled.recommendedValue,
        doNotTrackEnabled: chromeConfig.websites.doNotTrackEnabled.recommendedValue,
        hyperlinkAuditingEnabled: chromeConfig.websites.hyperlinkAuditingEnabled.recommendedValue,
        privacySandboxEnabled: chromeConfig.websites.privacySandboxEnabled.recommendedValue,
        protectedContentEnabled: chromeConfig.websites.protectedContentEnabled.recommendedValue,
        referrersEnabled: chromeConfig.websites.referrersEnabled.recommendedValue,
        thirdPartyCookiesAllowed: chromeConfig.websites.thirdPartyCookiesAllowed.recommendedValue
    }
}
