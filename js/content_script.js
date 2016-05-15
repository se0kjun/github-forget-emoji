var TabMenu = React.createClass({
    propTypes: {
        itemList: React.PropTypes.object.isRequired,
        itemName: React.PropTypes.string
    },

    render: function() {
        var childElem = Object.keys(this.props.itemList).map(function(m) {
            return React.createElement(TabLink, { itemName: m });
        }.bind(this));

        return React.createElement('div', 
        {
            className: 'ui top attached tabular menu'
        }, childElem);
    }
});

var TabItem = React.createClass({
    propTypes: {
        emojiList: React.PropTypes.object.isRequired,
        emojiName: React.PropTypes.string.isRequired
    },
    
    render: function() {
        var itemChild = Object.keys(this.props.emojiList).map(function(m) {
            if (Object.keys(this.props.emojiList) !== undefined) {
                // exists key: not array
                var childMenu = React.createElement(TabMenu, 
                    {
                        itemList: this.props.emojiList[m], 
                        itemName: m
                    });

                return React.createElement('div', 
                {
                    className: 'ui bottom attached tab segment'
                }, childMenu
                , React.createElement(TabItem, {emojiList: this.props.emojiList[m], emojiName: m}) );
            }
            else {
                // array type: show emoji-items
                var childEmoji = this.props.emojiList.map(function(m) {
                    return React.createElement(EmojiItem, {});
                });

                return React.createElement('div', 
                {
                    className: 'ui bottom attached tab segment',
                    'data-tab': this.props.emojiName
                }, childEmoji);
            }
        }.bind(this));

        return React.createElement('div', null, itemChild);
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
        emojiObject: React.PropTypes.object.isRequired
    },

    render: function() {
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

    componentDidMount: function() {
        $('.tabular.menu .item').tab();
    },

    render: function() {
        var childMenu = React.createElement(TabMenu, { itemList: this.state.emojiObject });
        var childItem = React.createElement(TabItem, {emojiList: this.state.emojiObject});

        return React.createElement('div',
        {
            className: 'emojibox'
        }, childMenu, childItem);
    }
});

ReactDOM.render(
    React.createElement(MainRender), 
    document.getElementById('emoji_selectmenu')
);
