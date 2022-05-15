const chrome_config = {
    network: {
        networkPredictionEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        webRTCIPHandlingPolicy: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    services: {
        alternateErrorPagesEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillAddressEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        autofillCreditCardEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        passwordSavingEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        safeBrowsingExtendedReportingEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        searchSuggestEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        spellingServiceEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        translationServiceEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        }
    },
    websites: {
        doNotTrackEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        hyperlinkAuditingEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        privacySandboxEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        protectedContentEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        referrersEnabled: {
            info: 'import setting, why - no one knows',
            recommendedValue: false,
            warningLevel: 'high'
        },
        thirdPartyCookiesAllowed: {
            info: 'import setting, why - no one knows',
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