var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
_gaq.push(['_trackPageview']);

function clickEventHandler(e) {
    _gaq.push(['_tackEvent', e.target.id, 'clicked']);
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