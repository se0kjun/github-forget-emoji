var TabMenu = React.createClass({
    propTypes: {
        itemList: React.PropTypes.object.isRequired,
        itemName: React.PropTypes.string,
        tabChildMenu: React.PropTypes.bool
    },

    render: function() {
        var childElem = Object.keys(this.props.itemList).map(function(m, idx) {
            if (idx === 0)
                return React.createElement(TabLink, { itemName: m, firstChild: true });
            else
                return React.createElement(TabLink, { itemName: m });
        }.bind(this));
        var childSearch = React.createElement(SearchEmoji);

        if (this.props.tabChildMenu) {
            return React.createElement('div', 
            {
                className: 'ui top attached tabular menu'
            }, childElem);
        }
        else {
            return React.createElement('div', 
            {
                className: 'ui top attached tabular menu'
            }, childElem, childSearch);
        }
    }
});

var TabItem = React.createClass({
    propTypes: {
        emojiList: React.PropTypes.object.isRequired,
        emojiName: React.PropTypes.string.isRequired
    },
    
    render: function() {
        var itemChild = Object.keys(this.props.emojiList).map(function(m, idx) {
            if (this.props.emojiList[m].constructor !== Array) {
                // exists key: not array
                var childMenu = React.createElement(TabMenu, 
                    {
                        itemList: this.props.emojiList[m], 
                        itemName: m,
                        tabChildMenu: true
                    });
                var class_name = 'ui bottom attached tab segment border-wrapper';
                if (idx === 0)
                    class_name = 'ui bottom attached tab segment border-wrapper active';

                return React.createElement('div', 
                {
                    className: class_name,
                    'data-tab': m
                }, childMenu
                , React.createElement(TabItem, {emojiList: this.props.emojiList[m], emojiName: m }) );
            }
            else {
                // array type: show emoji-items
                var childEmoji = this.props.emojiList[m].map(function(m) {
                    return React.createElement(EmojiItem, {emojiObject: m});
                });
                var class_name = 'ui bottom attached tab segment border-wrapper gh-emoji-scrollable';
                if (idx === 0)
                    class_name = 'ui bottom attached tab segment border-wrapper gh-emoji-scrollable active';

                return React.createElement('div', 
                {
                    className: class_name,
                    'data-tab': m
                }, childEmoji);
            }
        }.bind(this));

        return React.createElement('div', {className: 'ui wrapper'}, itemChild);
    }
});

var TabLink = React.createClass({
    propTypes: {
        itemName: React.PropTypes.string.isRequired,
        firstChild: React.PropTypes.bool
    },

    render: function() {
        var class_name = 'item';
        if (this.props.firstChild)
            class_name = 'item active';

        return React.createElement('a', 
        {
            className: class_name, 
            'data-tab': this.props.itemName
        }, this.props.itemName);
    }
});

var EmojiItem = React.createClass({
    propTypes: {
        emojiObject: React.PropTypes.array.isRequired
    },

    clickActions: function() {
        var self = this;
        chrome.storage.local.get('recent_emoji', function (result) {
            if (!$.isArray(result.recent_emoji)) {
                result.recent_emoji = [];
                result.recent_emoji.push(self.props.emojiObject);
            }
            else {
                for(var i = 0; i < result.recent_emoji.length; i++) {
                    if (result.recent_emoji[i].name == self.props.emojiObject.name) {
                        result.recent_emoji.splice(i, 1);
                        break;
                    }
                }
                result.recent_emoji.push(self.props.emojiObject);
            }

            if (result.recent_emoji.length > 10)
                result.recent_emoji.shift();

            chrome.storage.local.set({'recent_emoji': result.recent_emoji});
            console.dir(result.recent_emoji);
        });

        var txt = ':' + this.props.emojiObject.name + ':';
        var box = $('#issue_body, #new_comment_field, #new_commit_comment_field');

        var cursorPos = box.prop('selectionStart');
        var v = box.val();
        var textBefore = v.substring(0,  cursorPos );
        var textAfter  = v.substring( cursorPos, v.length );
        box.val( textBefore+ txt +textAfter );
        box.prop('selectionStart', cursorPos + txt.length);
        box.prop('selectionEnd', cursorPos + txt.length);
    },

    render: function() {
        return React.createElement('img', 
            {
                className: 'emoji-object',
                src: this.props.emojiObject.icon,
                onClick: this.clickActions,
                'data-content': this.props.emojiObject.name,
                'data-variation' : 'inverted',
                'data-alternative-name': this.props.emojiObject.alternative_name
            });
    }
});

var SearchEmoji = React.createClass({
    propTypes: {
        emojiQuery: React.PropTypes.string.isRequired
    },

    searchEmoji: function() {
    },

    render: function() {
        var childSearchBox = React.createElement('div', {className: 'item'},
            React.createElement('div', {className: 'ui transparent icon input'}, 
                React.createElement('input', {type: 'text', placeholder: 'Search emojis...', onChange: this.searchEmoji}),
                React.createElement('i', {className: 'search link icon'})
                )
            );

        return React.createElement('div', {className: 'right menu'}, childSearchBox);
    }
});

var MainRender = React.createClass({
    getInitialState: function() {
        return {
            emojiObject: {}
        }
    },

    componentWillMount: function() {
        $.get(chrome.extension.getURL('emoji.json'), $.proxy(function(data) {
            this.setState({
                emojiObject: JSON.parse(data)
            });
        }, this));
    },

    componentDidUpdate: function() {
        $('.tabular.menu .item').tab();
        $('.emoji-object').popup();
    },

    render: function() {
        var childMenu = React.createElement(TabMenu, { itemList: this.state.emojiObject });
        var childItem = React.createElement(TabItem, { emojiList: this.state.emojiObject });

        return React.createElement('div',
        {
            className: 'emojibox'
        }, childMenu, childItem);
    }
});

if ($('.emoji_selectmenu > .emojibox').length == 0) {
    ReactDOM.render(
        React.createElement(MainRender), 
        // document.getElementsByClassName('emoji_selectmenu')[0]
        document.getElementById('emoji_selectmenu')
    );
}

