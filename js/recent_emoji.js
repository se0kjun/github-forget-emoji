var EmojiItem = React.createClass({
    propTypes: {
        emojiObject: React.PropTypes.array.isRequired
    },

    clickActions: function() {
        var self = this;
        chrome.storage.local.get('recent_emoji', function (result) {
            for(var i = 0; i < result.recent_emoji.length; i++) {
                if (result.recent_emoji[i].name == self.props.emojiObject.name) {
                    result.recent_emoji.splice(i, 1);
                    break;
                }
            }
            result.recent_emoji.push(self.props.emojiObject);

            if (result.recent_emoji.length > 10)
                result.recent_emoji.shift();

            chrome.storage.local.set({'recent_emoji': result.recent_emoji});
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
            });
    }
});

var RecentEmoji = React.createClass({
    getInitialState: function() {
        return {
            emojiList: []
        }
    },

    componentWillMount: function() {
        var self = this;
        chrome.storage.local.get('recent_emoji', function (result) {
            self.setState({
                emojiList: result.recent_emoji
            });
        });

        chrome.storage.onChanged.addListener(function(changes, namespace) {
            self.setState({
                emojiList: changes['recent_emoji'].newValue
            });
        });
    },

    render: function() {
        var childEmoji = this.state.emojiList.reverse().map(function(m) {
            return React.createElement(EmojiItem, {emojiObject: m});
        });

        return React.createElement('div',
        {
            className: ''
        }, childEmoji);
    }
});

var renderer_comp = document.querySelectorAll('.gh-recent-emoji');
for (var i = 0; i < renderer_comp.length; i++) {
    ReactDOM.render(
        React.createElement(RecentEmoji), 
        renderer_comp[i]
    );
}
