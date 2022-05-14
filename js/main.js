function loadGrade(domain) {
    chrome.storage.local.get([domain], data => {
        if (typeof data[domain] !== 'undefined') {
            $('.grade').text(data[domain].rating.letter);
            $('.tab-name').text(data[domain].name);
        } else {
            $.get(`https://api.tosdr.org/search/v4/?query=${domain}`, function( response ) {
                if (response.parameters.services.length === 0) {
                    console.log('website not found');
                    return;
                }
                var service = response.parameters.services[0];
                var name = service.name;
                var rating = service.rating;
                $('.grade').text(rating.letter);
                $('.grade').addClass(`grade-${rating.letter.toLowerCase()}`)
                chrome.storage.local.set({[domain]: {name: name, rating: rating}}, function() {
                    console.log(`saved ${domain} - ${rating.letter}`);
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
        domain = domain.match(/[^\.]*\.[^.]*$/)[0];
        console.log(domain)
        $('.tab-name').text(domain);
        loadGrade(domain);
        verifyHeader(domain, url);
        verifyCookies(domain);
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

function addCheckboxListener() {
    $('input[type=checkbox].chrome-setting-checkbox').change( (event) => {
        let target = $(event.target);
        let category = target.attr('data-category');
        let setting = target.attr('data-setting');
        let value = target.is( ":checked" );
        chrome.privacy[category][setting].set({value: value}, () => {
            console.log(`successfully set setting ${category}.${setting} to ${value}`);
        });
    })
}

async function loadSettings() {
    console.log('loading settings')
    let keys = Object.keys(chrome_config);
    console.log(keys);
    for(var [idx, category_name] of keys.entries()) {
        console.log(idx, category_name);
        addSettingCategory(category_name, (idx === 0));
        var category = chrome_config[category_name];
        for( var setting in category) {
            let setting_config = category[setting];
            let value = await getSetting(category_name, setting);
            let isRecValue = value !== setting_config.recommendedValue;
            addSetting(category_name, setting, value, (isRecValue) ? 'none' : setting_config.warningLevel);
        }
    };
    addCheckboxListener();
    
}

function addLinkToWebsiteTab() {
    $('#view-details').click((event) => {
        event.preventDefault()
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
});

