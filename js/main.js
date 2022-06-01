var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-229958247-1']);
_gaq.push(['_trackPageview']);

function setGrade(data) {
    $('.tab-name').text(data.name);
    let grade = 'f';
    if (data.rating.letter !== 'N/A') {
        $('.grade').text(data.rating.letter);
        grade = data.rating.letter.toLowerCase();
    }
    // simple approach: $('#circle').attr('class', `circle grade-${grade}`);
    // better? remove previous grade-class with regex and add new grade class
    $('#circle').removeClass((index, classname) => {
        return (classname.match(/(^|\s)grade-[a-f]/g) || []).join(' ');
    });
    $('#circle').addClass(`grade-${grade}`);

    $('.tosdr-anchor').attr('href', `https://tosdr.org/en/service/${data.id}`);
}

function findMatchingResult(services, domain) {
    for(let service of services) {
        if (service.urls !== undefined && service.urls.includes(domain)) {
            return service;
        }
    }
    return null;
}

function loadGrade(domain) {
    chrome.storage.local.get([domain], data => {
        if (typeof data[domain] !== 'undefined') {
            setGrade(data[domain]);
        } else {
            $.get(`https://api.tosdr.org/search/v4/?query=${domain}`, (response) => {
                if (response.parameters.services.length === 0) {
                    console.log('website not found');
                    return;
                }
                let service = findMatchingResult(response.parameters.services, domain);
                if (service === null) {
                    console.log('matching service on tosdr.org not found');
                    return;
                }
                let data = { name: service.name, rating: service.rating, id: service.id};
                setGrade(data);
                chrome.storage.local.set({ [domain]: data }, function () {
                    console.log(`saved ${domain} - ${service.rating.letter}`);
                });
            });
        }
    });
}

function loadInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let activeTab = tabs[0];
        let url = new URL(activeTab.url);
        let pattern = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/;
        let matches = activeTab.url.match(pattern);
        if (matches !== 'undefined' && matches.length > 1) {
            let domain = matches[1];
            $('.tab-name').text(domain);
            loadGrade(domain);
            verifyHeader(domain, url);
            verifyCookies(domain);
        } else {
            $('.tab-name').text('No website found');
        }
    });
}

const getSetting = async (category, name) => {
    return new Promise((resolve, reject) => {
        chrome.privacy[category][name].get({}, function (details) {
            if (details.value === undefined) {
                reject();
            } else {
                resolve(details.value);
            }
        });
    });
}

function toggleEmoji(selector, category, name, value) {
    let setting = chromeConfig[category][name];
    const isRec = setting.recommendedValue === value;
    const severity = (isRec) ? 'low' : setting.warningLevel;
    $(selector).attr('class', severityToColor[severity]);
    $(`${selector} > i`).attr('class', `bi ${severityToEmoji[severity]}`);
}

function addCheckboxListener() {
    $('input[type=checkbox].chrome-setting-checkbox').change((event) => {
        let target = $(event.target);
        let category = target.attr('data-category');
        let setting = target.attr('data-setting');
        let value = target.is(':checked');
        chrome.privacy[category][setting].set({ value: value }, () => {
            console.log(`successfully set setting ${category}.${setting} to ${value}`);
            toggleEmoji(`#emoji-${setting}`, category, setting, value);
            _gaq.push(['_trackEvent', `${category}.${setting}`, 'clicked',  `${value}`]);
        });
    })
}

function trackNavigation() {
    $('button.nav-link').click((event) => {
        let target = $(event.target);
        _gaq.push(['_trackEvent', target.attr('id'), 'clicked']);
        console.log(`${target.attr('id')} clicked`);
    });
}

async function loadSettings() {
    console.log('loading settings');
    let keys = Object.keys(chromeConfig);
    for (let category_name of keys) {
        addSettingCategory(category_name);
        let category = chromeConfig[category_name];
        for (let setting in category) {
            let settingConfig = category[setting];
            if (chrome.privacy?.[category_name]?.[setting] !== undefined) {
                let value = await getSetting(category_name, setting);
                let isRecValue = value === settingConfig.recommendedValue;
                addSetting(category_name, setting, value, (isRecValue) ? 'low' : settingConfig.warningLevel, settingConfig.info);
            }
        }
    }
    addCheckboxListener();
    trackToolTip();
}

function trackToolTip() {
    $('i.info-tooltip').hover((event) => {
        if (event.type == 'mouseenter') {
            let target = $(event.target);
            _gaq.push(['_trackEvent', target.attr('data-name'), 'hovered']);
        }
    });
}

$(function () {
    loadInfo();
    loadSettings();
    // TODO: trigger 'click' doesnt seem to work
    // only hover is fine or need to investigate
    $('[data-toggle-bs="tooltip"]').tooltip({
        animated: 'fade',
        placement: 'bottom',
        trigger: 'click hover focus'
    });
    trackNavigation();
});
