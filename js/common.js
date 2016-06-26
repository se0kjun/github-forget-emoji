'use strict';

// var emoji_menu = $('<div/>', {
//     id: 'emoji_selectmenu',
// });

// var emoji_popup_btn = $('<div/>', {
//     id: 'emoji_popup',
//     class: 'toolbar-group'
// });

// //button for opening modal of emojis
// var emoji_btn = $('<img/>', {
//     id: 'emoji_btn',
//     class: 'toolbar-item emoji-item',
//     src: chrome.extension.getURL('res/smile.png')
// });

// if ($('#emoji_selectmenu').length == 0)
//     $('.timeline-comment > .discussion-topic-header').after(emoji_menu);

// if ($('#emoji_selectmenu').length == 0)
//     $('.timeline-comment > .previewable-comment-form').before(emoji_menu);

// $('.js-toolbar.toolbar-commenting').append($(emoji_popup_btn).append(emoji_btn));

// $(emoji_btn).click(function() {
//     $('#emoji_selectmenu').toggle('hide');
// });

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
            $('#gh-emoji-modal-wrapper').toggle('hide');
        })
    );

    var emoji_modal = $('<div/>', {
        class: 'gh-emoji-modal'
    }), emoji_header = $('<div/>', {
        class: 'gh-emoji-header'
    }).append(
        $('<span/>', {
            class: 'gh-emoji-header-content',
            text: 'Select emoji'
        })
    ), emoji_contents = $('<div/>', {
        class: 'gh-emoji-content'
    }).append(emoji_menu)
    , emoji_modal_wrapper = $('<div/>', {
        id: 'gh-emoji-modal-wrapper',
        class: 'gh-emoji-wrapper'
    });

    // if ($('#emoji_selectmenu').length == 0)
    //     $('.timeline-comment > .discussion-topic-header').after(emoji_menu);

    // if ($('#emoji_selectmenu').length == 0)
    //     $('.timeline-comment > .previewable-comment-form').before(emoji_menu);

    $('.js-toolbar.toolbar-commenting').append(emoji_popup_btn);
    emoji_modal.append(emoji_contents, emoji_header);
    emoji_popup_btn.append(
        emoji_modal_wrapper.append(emoji_modal).hide());
})();


