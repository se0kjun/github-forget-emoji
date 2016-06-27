'use strict';

var emoji_menu = $('<div/>', {
    class: 'emoji_selectmenu',
});

if ($('.timeline-comment > .emoji_selectmenu').length == 0)
    $('.timeline-comment > .discussion-topic-header').after(emoji_menu);

if ($('.timeline-comment > .emoji_selectmenu').length == 0)
    $('.timeline-comment > .previewable-comment-form').before(emoji_menu);

function mutation(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            $(mutation.addedNodes[0]).find('.previewable-comment-form').before(emoji_menu);
        }
    });
}

document.querySelectorAll('table.diff-table > tbody').forEach(function(elem) {
    var observer = new MutationObserver(mutation);
    observer.observe(elem, { attributes: true, childList: true, characterData: true });
});

// $('table.diff-table').each(function(idx, elem) {
//     var observer = new MutationObserver(mutation);    
//     console.log(elem);
//     observer.observe(elem, { attributes: true, childList: true, characterData: true });
// });
// observer.observe(document.querySelector('table.diff-table'), 
//     { attributes: true, childList: true, characterData: true });
