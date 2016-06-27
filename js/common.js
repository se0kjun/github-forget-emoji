'use strict';

(function modal_init() {
    var emoji_menu = $('<div/>', {
        id: 'emoji_selectmenu',
    }),
    //button for opening a modal of emojis
    emoji_popup_btn = $('<div/>', {
        id: 'emoji_popup',
        class: 'toolbar-group'
    }).append(
        $('<img/>', {
            id: 'emoji_btn',
            class: 'toolbar-item emoji-item',
            src: chrome.extension.getURL('res/smile.png')
        }).click(function() {
            $('#gh-emoji-modal-wrapper').toggleClass('gh-emoji-modal-hide');
        })
    );

    var emoji_modal = $('<div/>', {
        class: 'gh-emoji-modal'
    }), emoji_modal_close = $('<i/>', {
        class: 'fa fa-times',
        'aria-hidden': 'true'
    }), emoji_header = $('<div/>', {
        class: 'gh-emoji-header'
    }).append(
        $('<span/>', {
            class: 'gh-emoji-header-content',
            text: 'Select emoji'
        }),
        emoji_modal_close
    ), emoji_contents = $('<div/>', {
        class: 'gh-emoji-content'
    }).append(emoji_menu)
    , emoji_modal_wrapper = $('<div/>', {
        id: 'gh-emoji-modal-wrapper',
        class: 'gh-emoji-wrapper gh-emoji-modal-hide'
    });

    // if ($('.timeline-comment > .emoji_selectmenu').length == 0)
    //     $('.timeline-comment > .discussion-topic-header').after(emoji_menu);

    // if ($('.timeline-comment > .emoji_selectmenu').length == 0)
    //     $('.timeline-comment > .previewable-comment-form').before(emoji_menu);

    $('.js-toolbar.toolbar-commenting').append(emoji_popup_btn);
    emoji_modal.append(emoji_contents, emoji_header);
    emoji_popup_btn.append(
        emoji_modal_wrapper.append(emoji_modal));
})();

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
