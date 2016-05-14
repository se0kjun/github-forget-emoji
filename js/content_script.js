var TabMenu = React.createClass({
    displayName: "TabMenu",

    propTypes: {
        itemList: React.PropTypes.array.isRequired,
        itemName: React.PropTypes.string
    },

    render: function() {
        var childElem = Object.keys(this.props.itemList).map(function(m) {
            return React.createElement(TabLink, {itemName: this.props.itemList[m]});
        });
      
        return React.createElement('div', 
        {
            className: 'ui top attached tabular menu'
        }, childLink);
    }
});

var TabItem = React.createClass({
    propTypes: {
        emojiList: React.PropTypes.array.isRequired,
        emojiName: React.PropTypes.string.isRequired
    },
    
    render: function() {
        if (Object.keys(this.props.emojiList) !== undefined) {
            // exists key: not array
            var childMenu = React.createElement(TabMenu, 
                {
                    itemList: this.props.emojiList, 
                    itemName: this.props.emojiName
                });
          
            return React.createElement('div', 
            {
                className: 'ui bottom attached tab segment'
            }, childMenu);
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
            emojiObject: null
        }
    },

    getEmojiObject: function() {
        $.get('emoji.json', function(data) {
            this.setState({
                'emojiObject': data
            });
        }).bind(this);
    },

    componentWillDidMount: function() {
        $('.tabular.menu .item').tab();
    },

    render: function() {
        this.getEmojiObject();
        var childMenu = React.createElement(TabMenu, { itemList: this.state.emojiObject });

        return React.createElement('div',
        {
            className: 'emojibox'
        }, childMenu);
    }
});

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: render() {
    return React.createElement(
      "div",
      {className: 'test', 'data-tab': this.props.name},
      "Hello ",
      this.props.name
    );
   }
});

ReactDOM.render(
    React.createElement(HelloMessage, { name: "John" }), 
    document.getElementById('emoji_selectmenu')
);
