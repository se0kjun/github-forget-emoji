'use strict';

var emoji_menu = $('<div/>', {
    id: 'emoji_selectmenu',
});

if ($('#emoji_selectmenu').length == 0)
    $('.timeline-comment > .discussion-topic-header').after(emoji_menu);

if ($('#emoji_selectmenu').length == 0)
    $('.timeline-comment > .previewable-comment-form').before(emoji_menu);

