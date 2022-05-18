function verifyHeader(domain, url) {
    chrome.storage.local.get([`${domain}-header`], data => {
        if (typeof data[`${domain}-header`] === 'undefined') {
            console.log(`header for ${domain} not storage - fetching header`)
            getHeaders(url, (headerMap) => {
                checkHeader(headerMap);
                chrome.storage.local.set({[`${domain}-header`]: {header: headerMap}}, () => {
                    console.log(`saved header for ${domain}`);
                });
            });
        } else {
            console.log(`found header for ${domain} in storage`)
            let headerMap = data[`${domain}-header`].header;
            checkHeader(headerMap);
        }
    });
}

function checkHeader(headerMap) {
    for(const [header, setting] of Object.entries(security_headers)) {
        if (header in headerMap) {
            addOkIssue(`found header ${header}`, setting.info);
        } else {
            addIssue(`missing header ${header}`, setting.warningLevel, setting.info);
        }
    };
    return headerMap;
}

function getHeaders(url, callback) {
    $.ajax({
        type: 'GET',
        url: url,
        success: (data, textStatus, request) => {
            var responseHeaders = request.getAllResponseHeaders();
            let headerMap = getHeaderArray(responseHeaders);
            callback(headerMap);
        },
        error: (request, textStatus, error) => {
            console.log(`failed to verify header for ${url} - ${textStatus} - ${error}`);
        }
    })
}

function getHeaderArray(responseHeaders) {
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
    var arr = responseHeaders.trim().split(/[\r\n]+/);
    var headerMap = {};
    arr.forEach(function (line) {
      var parts = line.split(': ');
      var header = parts.shift();
      var value = parts.join(': ');
      headerMap[header] = value;
    });
    return headerMap;
}

function verifyCookies(domain) {
    chrome.cookies.getAll({domain: domain}, (cookies) => {
        cookies.forEach((cookie) => {
            for(const [attribute, setting] of Object.entries(cookieAttributes)) {
                if (!cookie[attribute]) {
                    addIssue(`missing ${attribute} for ${cookie.name}`, setting.warningLevel, setting.info);
                }
            }
        });
    });
}
