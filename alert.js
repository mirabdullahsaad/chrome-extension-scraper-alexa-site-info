
var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.runtime.getURL('script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);



var s1 = document.createElement('script');
s1.onload = function() {
    this.remove();
};
s1.innerHTML = 'var scrapper_shop = "'+shop_url+'";var stop_status = 0;';
(document.head || document.documentElement).appendChild(s1);