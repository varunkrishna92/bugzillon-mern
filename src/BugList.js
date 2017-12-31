var React = require('react');
var ReactDOM = require('react-dom');
var createClass = require('create-react-class');
var $ = require('jquery');

var BugFilter = require('./BugFilter');
var BugAdd = require('./BugAdd');

var BugRow = createClass({
  render: function() {
  	console.log("Rendering BugRow:", this.props.bug);
    return (
      <tr>
        <td>{this.props.bug._id}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    )
  }
});

var BugTable = createClass({
  render: function() {
  	console.log("Rendering bug table, num items:", this.props.bugs.length);
  	var bugRows = this.props.bugs.map(function(bug){
  		return <BugRow key={bug._id} bug={bug} />
  	});
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    )
  }
});




var BugList = createClass({
	getInitialState: function() {
		return {bugs: []};
	},
  render: function() {
  	console.log("Rendering bug list, num items:", this.state.bugs.length);
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs}/>
        <hr />
        <BugAdd addBug={this.addBug}/>
      </div>
    )
  },


  componentDidMount: function() {
  	$.ajax('/api/bugs').done(function(data){
  		this.setState({bugs: data});
  	}.bind(this));
  },

  addBug: function(bug) {
  	console.log("Adding bug:", bug);
  	$.ajax({
  		type: 'POST', url: '/api/bugs', contentType: 'application/json',
  		data: JSON.stringify(bug),
  		success: function(data){
  			var bug = data;
  			var bugsModified = this.state.bugs.concat(bug);
+        	this.setState({bugs: bugsModified});
  		}.bind(this),
  		error: function(xhr, status, err){
  			console.log("Error adding bug:", err);
  		}
  	});

  }
});

module.exports = BugList;