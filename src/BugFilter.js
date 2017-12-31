var React = require('react');
var ReactDOM = require('react-dom');
var createClass = require('create-react-class');
var $ = require('jquery');

var BugFilter = createClass({
  render: function() {
  	console.log("Rendering BugFilter");
    return (
      <div>A way to filter the list of bugs would come here.</div>
    )
  }
});

module.exports = BugFilter;