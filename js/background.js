importScripts('./psl.min.js');

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(changeInfo);
    if (changeInfo.url) {
        loadInfo(changeInfo.url);
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url) {
            loadInfo(tab.url);
        }
    });
});

chrome.webRequest.onHeadersReceived.addListener((details) => {
    if (details.type == 'main_frame') {
        let domain = parseUrl(details.url)?.domain;
        if (domain === undefined) return;
        var responseHeaderMap = details.responseHeaders.reduce((obj, item) => (obj[item.name] = item.value, obj) ,{});
        chrome.storage.local.set({[`${domain}-header`]: {header: responseHeaderMap}}, () => {
            console.log(`saved header for ${domain}`);
        });
    }
}, {urls: ["<all_urls>"]}, ["responseHeaders", "extraHeaders"]);

function tosDrCallback(json, domain, sld) {
    if (json.parameters.services.length === 0) {
        console.log(`service ${domain} not found on tosdr`);
        return false;
    }
    let service = json.parameters.services.find(service => service.urls.includes(sld || domain));
    if (service === undefined) {
        console.log(`matching service for ${domain} on tosdr.org not found`);
        return false;
    }
    console.log(service);
    let data = { name: service.name, rating: service.rating, id: service.id};
    setExtensionIcon(data);
    chrome.storage.local.set({ [domain]: data }, function () {
        console.log(`saved ${domain} - ${service.rating.letter}`);
    });
    return true;
}

function loadGrade(domain, sld) {
    chrome.storage.local.get([domain], data => {
        if (typeof data[domain] !== 'undefined') {
            setExtensionIcon(data[domain]);
            return;
        }
        fetch(`https://api.tosdr.org/search/v4/?query=${domain}`).then((response) => {
            if (response.status !== 200) {
                console.log(`Could not query tosdr. Status Code: ${response.status}`);
                return;
            }
            response.json().then(json => {
                let success = tosDrCallback(json, domain, sld);
                if (!success) {
                    chrome.action.setIcon({ path: `../img/logo-grade-f.png` });
                }
            });                 
        });
    });
}

function parseUrl(url) {
    let urlobj = new URL(url);
    let parsed = psl.parse(urlobj.hostname);
    console.log(parsed);
    return parsed;
}

function loadInfo(tabUrl) {
    if (tabUrl.startsWith('chrome://')) {
        chrome.action.setIcon({ path: `../img/logo-32x32.png` });
        return;
    }
    let parsedDomain = parseUrl(tabUrl);
    let domain = parsedDomain.domain;
    if (domain !== undefined) {
        loadGrade(domain, domain.sld);
    } else {
        console.log(`website not found: ${url}`);
        chrome.action.setIcon({ path: `../img/logo-32x32.png` });
    }
}

function setExtensionIcon(grade) {
    let letter = 'f';
    if (grade.rating.letter != 'N/A') {
        letter = grade.rating.letter.toLowerCase();
    }
    console.log(`change logo to: ../img/logo-grade-${letter}.png`);
    chrome.action.setIcon({ path: `../img/logo-grade-${letter}.png` });
}