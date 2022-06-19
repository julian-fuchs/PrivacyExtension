const trackingEnabled = false;

if (trackingEnabled) {
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-230603791-1']);
    _gaq.push(['_trackPageview']);
}

function trackingPush(data) {
    if (trackingEnabled) {
        _gaq.push(data);
    }
}

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

function verifyHeader(domain) {
    chrome.storage.local.get([`${domain}-header`], data => {
        if (typeof data[`${domain}-header`] !== 'undefined') {
            console.log(`found header for ${domain} in storage`)
            const headerMap = data[`${domain}-header`].header;
            for(const [header, setting] of Object.entries(securityHeaders)) {
                if (header in headerMap) {
                    addDetail(header, 'HTTP Headers', header, true,'low', setting.info);
                } else {
                    addDetail(header, 'HTTP Headers', header, false, setting.warningLevel, setting.info);
                }
            }
        }
    });
}

function verifyCookies(domain) {
    chrome.cookies.getAll({domain: domain}, (cookies) => {
        cookies.forEach((cookie) => {
            for(const [attribute, setting] of Object.entries(cookieAttributes)) {
                if (cookie[attribute]) {
                    addDetail(attribute, `${attribute} Attribute`, cookie.name, true, 'low', setting.info);
                } else {
                    addDetail(attribute, `${attribute} Attribute`, cookie.name, false, setting.warningLevel, setting.info);
                }
            }
        });
    });
}

function getDomain(url) {
    let urlobj = new URL(url);
    let parsed = psl.parse(urlobj.hostname);
    return parsed.domain;
}

function loadInfo() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let domain = getDomain(tabs[0].url);
        if (domain !== undefined && domain !== null) {
            $('.tab-name').text(domain);
            chrome.storage.local.get([domain], data => {
                if (typeof data[domain] !== 'undefined') {
                    setGrade(data[domain]);
                }
            });
            verifyHeader(domain);
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

function toggleEmoji(selector, category, name, value, isOriginal) {
    let setting = chromeConfig[category][name];
    const isRec = setting.recommendedValue === value;
    const severity = (isRec) ? 'low' : setting.warningLevel;
    $(selector).attr('class', severityToColor[severity]);
    $(`${selector} > i`).attr('class', `bi ${severityToEmoji[severity]}`);

    if (isRec && isOriginal) {
        $(`.heart`).toggleClass('d-none');
        $(`.heart`).toggleClass('animating');
    }
}

function addCheckboxListener() {
    $('input[type=checkbox].chrome-setting-checkbox').change((event) => {
        let target = $(event.target);
        let category = target.attr('data-category');
        let setting = target.attr('data-setting');
        let value = target.is(':checked');
        let isOriginal = event.hasOwnProperty('originalEvent');
        if (isOriginal) {
            chrome.storage.local.set({ profile: 'custom' }, function () {
                console.log(`overwrite profile to custom`);
            });
            $('.profile-group > input').prop('checked', false);
            $('#profileRadio-custom').prop('checked', true);
            $('#rofileRadio-custom').trigger('change');
        }
        console.log(event);
        chrome.privacy[category][setting].set({ value: value }, () => {
            console.log(`successfully set setting ${category}.${setting} to ${value}`);
            toggleEmoji(`#emoji-${setting}`, category, setting, value, isOriginal);
            trackingPush(['_trackEvent', `${category}.${setting}`, 'clicked',  `${value}`]);
        });
    })
}

function trackNavigation() {
    $('button.nav-link').click((event) => {
        let target = $(event.target);
        trackingPush(['_trackEvent', target.attr('id'), 'clicked']);
    });
}

function addProfileListener() {
    $('input[type=radio].profile-btn').change((event) => {
        let target = $(event.target);
        let profile = target.attr('data-profile');
        // save profile to localstorage
        chrome.storage.local.set({ profile: profile }, function () {
            console.log(`set profile to ${profile}`);
        });
        if (profile === 'custom') {
            return;
        }
        let profileSettings = profiles[profile];
        for (const [setting, value] of Object.entries(profileSettings)) {
            $(`#checkbox-${setting}`).prop('checked', value);
            $(`#checkbox-${setting}`).trigger('change');
        }       
    });

    $('.btn-outline-primary').click(event => {
        let target = $(event.target);
        let value = target.attr('for');
        $('.profile-group > input').prop('checked', false);
        $(`#${value}`).prop('checked', true);
        $(`#${value}`).trigger('change');
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
    chrome.storage.local.get(["profile"], data => {
        if (data.profile !== undefined) {
            console.log(`found profile in storage: ${data.profile}`);
            $(`#profileRadio-${data.profile}`).prop("checked", true);
        }
    });
    addEventListeners();
}

function addEventListeners() {
    addCheckboxListener();
    trackToolTip();
    addHeartEvents();
    addProfileListener();
    trackNavigation();
    $('.info-tooltip').tooltip({
        animated: 'fade',
        placement: 'bottom',
        trigger: 'hover focus'
    });
}

function trackToolTip() {
    $('.info-tooltip').hover((event) => {
        if (event.type == 'mouseenter') {
            let target = $(event.target);
            trackingPush(['_trackEvent', target.attr('data-name'), 'hovered']);
        }
    });
}

function addHeartEvents() {
    $(".heart").on('animationend', () => {
        $('.heart.animating').toggleClass('d-none');
        $('.heart.animating').toggleClass('animating');
    });

    $(".heart").on('animationcancel', () => {
        $('.heart.animating').toggleClass('d-none');
    });

}

$(function () {
    loadInfo();
    loadSettings();
});
