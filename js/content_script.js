var TabMenu = React.createClass({
    displayName: "TabMenu",

    propTypes: {
        itemList: React.PropTypes.array.isRequired
    },

    render: function render() {
        var childLink = this.props.itemList.map(function(m) {
            return React.createElement(TabLink, {itemName: m});
        });
        
        return React.createElement('div', {}, childLink);
    }
});

var TabItem = React.createClass({
    propTypes: {
        emojiList: React.PropTypes.array.isRequired,
        emojiName: React.PropTypes.string.isRequired
    },
    
    render: function render() {
        return React.createElement('div', {})
    }
});

var TabLink = React.createClass({
    propTypes: {
        itemName: React.PropTypes.string.isRequired
    },

    render: function render() {
        return React.createElement('a', {className: 'item', data-tab: this.props.itemName}, this.props.itemName);
    }
});


var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
   }
});

ReactDOM.render(
    React.createElement(HelloMessage, { name: "John" }), 
    document.getElementById('emoji_selectmenu')
);
