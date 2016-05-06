'use strict';

(function() {
    var editor_box = $('.timeline-comment');

    $.get(chrome.extension.getURL('html/emoji_box.html'), function(d) {
        $('.timeline-comment .discussion-topic-header').append(d);
    });
})();