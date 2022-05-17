const chrome_config = {
    network: {
        networkPredictionEnabled: {
            info: 'During startup and browsing domain names are getting pre-resolved. This ranges from sites you currently visit to pages you might look up later, or some of the suggested URL while typing. Therefore your browsing habbits are getting passed as information.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        webRTCIPHandlingPolicy: {
            info: 'WebRTC helps with the real-time-communication, but is known for leaking your local address depending on usage. Therefore use it with caution.',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    services: {
        alternateErrorPagesEnabled: {
            info: 'Chrome switches the visited-side error page with its own. Why would you need that?',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillAddressEnabled: {
            info: 'Chrome saves the sides you visited, also possible usernames etc. That is a lot of data about you.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillEnabled: {
            info: 'Chrome saves information about form data, for example shipping/login-information etc. Hence if you login somewhere Chrome takes notice of this.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillCreditCardEnabled: {
            info: 'Chrome has knowledge about your credit card, but uses an "alias" to keep your data hidden.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        passwordSavingEnabled: {
            info: 'Using a password manager is not a bad idea, but Chrome will store those in an unsafe way. Use a commercial password manager that encrypts your data!',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingEnabled: {
            info: 'The website you visit is being screened by chrome if it\'s malicious.',
            recommendedValue: true,
            warningLevel: 'high'
        },
        safeBrowsingExtendedReportingEnabled: {
            info: 'Chrome sends Google information about pages it blocked for you.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        searchSuggestEnabled: {
            info: 'Your search habits are getting evaluated by Omnibox, a tool from Google.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        spellingServiceEnabled: {
            info: 'The third party AI webservice Sapling checks your writing. ',
            recommendedValue: false,
            warningLevel: 'high'
        },
        translationServiceEnabled: {
            info: 'Bablic translates your webpages and saves those.',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    websites: {
        doNotTrackEnabled: {
            info: 'It sends a request to the visited side asking to no track you. It doesn\'t prohibit tracking.',
            recommendedValue: true,
            warningLevel: 'high'
        },
        hyperlinkAuditingEnabled: {
            info: 'This service tracks link klicks on sites.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        privacySandboxEnabled: {
            info: 'New feature of Chrome to improve privacy by acting as the third-party cookie. So third-party cookies of websites are replaced. ',
            recommendedValue: true,
            warningLevel: 'high'
        },
        protectedContentEnabled: {
            info: 'With this you can view protected content.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        referrersEnabled: {
            info: 'Sends referer headers with your request.',
            recommendedValue: false,
            warningLevel: 'high'
        },
        thirdPartyCookiesAllowed: {
            info: 'Blocks sites you visit from directly giving you third-party cookies.',
            recommendedValue: false,
            warningLevel: 'high'
        }
    }
};

const security_headers = {
    "x-frame-options": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "x-xss-protection": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "content-security-policy": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "strict-transport-security": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "x-content-type-options": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "x-permitted-cross-domain-policies": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "referrer-policy": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "expect-ct": {
        warningLevel: 'high',
        info: 'important header, should always set'
    },
    "feature-policy": {
        warningLevel: 'high',
        info: 'important header, should always set'
    }
};

const cookieAttributes = {
    hostOnly: {
        warningLevel: 'high',
        info: ''
    },
    httpOnly: {
        warningLevel: 'high',
        info: ''
    },
    sameSite: {
        warningLevel: 'high',
        info: ''
    },
    secure: {
        warningLevel: 'high',
        info: ''
    }
};
