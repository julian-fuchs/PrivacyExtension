const chrome_config = {
    network: {
        networkPredictionEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        webRTCIPHandlingPolicy: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    services: {
        alternateErrorPagesEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillAddressEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillCreditCardEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        passwordSavingEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingExtendedReportingEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        searchSuggestEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        spellingServiceEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        translationServiceEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    websites: {
        doNotTrackEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        hyperlinkAuditingEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        privacySandboxEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        protectedContentEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        referrersEnabled: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        },
        thirdPartyCookiesAllowed: {
            info: '',
            recommendedValue: false,
            warningLevel: 'high'
        }
    }
};

const security_headers = {
    "x-frame-options": {
        warningLevel: 'high',
        info: ''
    },
    "x-xss-protection": {
        warningLevel: 'high',
        info: ''
    },
    "content-security-policy": {
        warningLevel: 'high',
        info: ''
    },
    "strict-transport-security": {
        warningLevel: 'high',
        info: ''
    },
    "x-content-type-options": {
        warningLevel: 'high',
        info: ''
    },
    "x-permitted-cross-domain-policies": {
        warningLevel: 'high',
        info: ''
    },
    "referrer-policy": {
        warningLevel: 'high',
        info: ''
    },
    "expect-ct": {
        warningLevel: 'high',
        info: ''
    },
    "feature-policy": {
        warningLevel: 'high',
        info: ''
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