'use strict';

// Github uses HTML5's pushState for page transitions.
// So the content script is forced to execute using webNavigation.
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    console.log('test');
    chrome.tabs.executeScript(null,{file:"js/common.js"});
    chrome.tabs.executeScript(null,{file:"js/content_script.js"});
});
