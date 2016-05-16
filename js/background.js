'use strict';

// Github uses HTML5's pushState for page transitions.
// So the content script is forced to execute using webNavigation.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    chrome.tabs.executeScript(null,{file:"js/vendor/jquery-2.2.3.min.js"});
    chrome.tabs.executeScript(null,{file:"js/common.js"});
    chrome.tabs.executeScript(null,{file:"js/vendor/semantic.min.js"});
    chrome.tabs.executeScript(null,{file:"js/vendor/browser.min.js"});
    chrome.tabs.executeScript(null,{file:"js/vendor/react.min.js"});
    chrome.tabs.executeScript(null,{file:"js/vendor/react-dom.min.js"});
    chrome.tabs.executeScript(null,{file:"js/vendor/react-with-addons.min.js"});
    chrome.tabs.executeScript(null,{file:"js/content_script.js"});
});

