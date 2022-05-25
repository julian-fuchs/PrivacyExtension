var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-229958247-1']);
_gaq.push(['_trackPageview']);

function clickEventHandler(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
}

function trackCheckbox() {
    var checkboxes = document.querySelectorAll('input');
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', clickEventHandler);
    }
}

$(function() {
    trackCheckbox();
});
