function setGrade(data) {
    $('.tab-name').text(data.name);
    $('.grade').text(data.rating.letter);
    let grade = 'f';
    if (data.rating.letter !== 'N/A'){
        grade = data.rating.letter.toLowerCase();
    }
    // simple approach: $('#circle').attr('class', `circle grade-${grade}`);
    // better? remove previous grade-class with regex and add new grade class
    $('#circle').removeClass((index, classname) => {
        return (classname.match(/(^|\s)grade-[a-f]/g) || []).join(' ');
    });
    $('#circle').addClass(`grade-${grade}`);
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
                var service = response.parameters.services[0];
                var data = {name: service.name, rating: service.rating};
                setGrade(data);
                chrome.storage.local.set({[domain]: data}, function() {
                    console.log(`saved ${domain} - ${service.rating.letter}`);
                });
            });
        }
    });
}

function loadInfo() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        var url = new URL(activeTab.url);
        var domain = url.hostname;
        if (/[^\.]*\.[^.]*$/.test(domain)) {
            domain = domain.match(/[^\.]*\.[^.]*$/)[0];
            console.log(domain);
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
        chrome.privacy[category][name].get({}, function(details) {
            if (details.value === undefined) {
                reject();
            } else {
                resolve(details.value);
            }
        });
    });
}

function toggleEmoji(selector, category, name, value) {
    let setting = chrome_config[category][name];
    const isRec = setting.recommendedValue === value;
    const severity = (isRec) ? 'none' : setting.warningLevel;
    $(selector).attr('class', severityToColor[severity]);
    $(`${selector} > i`).attr('class', `bi ${severityToEmoji[severity]}`);
}

function addCheckboxListener() {
    $('input[type=checkbox].chrome-setting-checkbox').change( (event) => {
        let target = $(event.target);
        let category = target.attr('data-category');
        let setting = target.attr('data-setting');
        let value = target.is(':checked');
        chrome.privacy[category][setting].set({value: value}, () => {
            console.log(`successfully set setting ${category}.${setting} to ${value}`);
            toggleEmoji(`#emoji-${setting}`, category, setting, value);
        });
    })
}

async function loadSettings() {
    console.log('loading settings');
    let keys = Object.keys(chrome_config);
    for(var [idx, category_name] of keys.entries()) {
        addSettingCategory(category_name, (idx === 0));
        var category = chrome_config[category_name];
        for( var setting in category) {
            let settingConfig = category[setting];
            if (chrome.privacy?.[category_name]?.[setting] !== undefined) {
                let value = await getSetting(category_name, setting);
                let isRecValue = value === settingConfig.recommendedValue;
                addSetting(category_name, setting, value, (isRecValue) ? 'none' : settingConfig.warningLevel, settingConfig.info);
            }
        }
    }
    addCheckboxListener();
}

function addLinkToWebsiteTab() {
    $('#view-details').click((event) => {
        event.preventDefault();
        $('.tab-content > .tab-pane.active').removeClass('active');
        $('#tablist > .nav-link.active').removeClass('active');
        $('#website').addClass('active');
        $('#website-tab').addClass('active');
    });
}

$(function() {
    loadInfo();
    loadSettings();
    addLinkToWebsiteTab();
    // TODO: trigger 'click' doesnt seem to work
    // only hover is fine or need to investigate
    $('[data-toggle-bs="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'bottom',
      trigger: 'click hover focus'
    });
});
