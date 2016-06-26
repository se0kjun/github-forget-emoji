var TabMenu = React.createClass({
    propTypes: {
        itemList: React.PropTypes.object.isRequired,
        itemName: React.PropTypes.string,
        tabChildMenu: React.PropTypes.bool
    },

    render: function() {
        var childElem = Object.keys(this.props.itemList).map(function(m) {
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
        emojiName: React.PropTypes.string.isRequired,
        tabChildItem: React.PropTypes.bool
    },
    
    render: function() {
        var itemChild = Object.keys(this.props.emojiList).map(function(m) {
            if (this.props.emojiList[m].constructor !== Array) {
                // exists key: not array
                var childMenu = React.createElement(TabMenu, 
                    {
                        itemList: this.props.emojiList[m], 
                        itemName: m,
                        tabChildMenu: true
                    });

                return React.createElement('div', 
                {
                    className: 'ui bottom attached tab segment border-wrapper',
                    'data-tab': m
                }, childMenu
                , React.createElement(TabItem, {emojiList: this.props.emojiList[m], emojiName: m, tabChildItem: true}) );
            }
            else {
                // array type: show emoji-items
                var childEmoji = this.props.emojiList[m].map(function(m) {
                    return React.createElement(EmojiItem, {emojiObject: m});
                });

                return React.createElement('div', 
                {
                    className: 'ui bottom attached tab segment border-wrapper gh-emoji-scrollable',
                    'data-tab': m
                }, childEmoji);
            }
        }.bind(this));

        if (this.props.tabChildItem) {
            return React.createElement('div', {className: 'ui wrapper'}, itemChild);
        } 
        else {
            return React.createElement('div', {className: 'ui wrapper'}, itemChild);
        }
    }
});

var TabLink = React.createClass({
    propTypes: {
        itemName: React.PropTypes.string.isRequired
    },

    render: function() {
        return React.createElement('a', 
        {
            className: 'item', 
            'data-tab': this.props.itemName
        }, this.props.itemName);
    }
});

var EmojiItem = React.createClass({
    propTypes: {
        emojiObject: React.PropTypes.array.isRequired
    },

    clickActions: function() {
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

var ShowEmoji = React.createClass({
    getInitialState: function() {
        return {
            emojiBoxState: false
        }
    },

    toggleEmoji: function() {
        $('.emojibox > div:nth-child(1)').toggleClass('hide-emoji');
        $('.emojibox > div:nth-child(1)').toggleClass('show-emoji');
        
        $('.emojibox > div:nth-child(2)').toggleClass('hide-emoji');
        $('.emojibox > div:nth-child(2)').toggleClass('show-emoji');

        this.setState({
            emojiBoxState: !this.state.emojiBoxState
        });
    },

    render: function() {
        var childToggle = React.createElement('input', { type: 'checkbox', name: 'public'});
        var labelText;
        if (this.state.emojiBoxState) {
            labelText = 'hide emoji';
        }
        else {
            labelText = 'show emoji';
        }
        var childToggleLabel = React.createElement('label', null, labelText);

        return React.createElement('div',
        {
            className: 'ui toggle checkbox',
            onClick: this.toggleEmoji
        }, childToggle, childToggleLabel);
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
        // var showBox = React.createElement(ShowEmoji);

        return React.createElement('div',
        {
            className: 'emojibox'
        }, childMenu, childItem);
    }
});

if ($('#emoji_selectmenu > .emojibox').length == 0) {
    ReactDOM.render(
        React.createElement(MainRender), 
        document.getElementById('emoji_selectmenu')
    );
}