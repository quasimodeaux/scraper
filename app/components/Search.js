const React = require("react");
const Router = require('react-router');
const test = "test";
const helpers = require('../utils/helpers');

const Main = require('./Main');

var Search = React.createClass({
  getInitialState: function() {
    return {
      searchQuery: "",
      topic: "",
      start: "",
      end: "",
      results: []
    };
  },

  postSaved: function(article) {
    helpers.postArt(article);
  },

  handletopicChange: function(event) {

    this.setState({ topic: event.target.value });

  },
  handlestartChange: function(event) {

    this.setState({ start: event.target.value });

  },
  handleEndChange: function(event) {

    this.setState({ end: event.target.value });

  },

  handleSubmit: function(event) {
    event.preventDefault();
    console.log("TOPIC " + this.state.topic);
    console.log("Start " + this.state.start);
    console.log("End " + this.state.end);
    this.props.setParent(this.state.topic, this.state.start, this.state.end);


  },

  render: function() {
    return (
      <div className="row">
        <div className="col-sm-12">
        <br />
          <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title"><strong>Search</strong></h3>
          </div>
          <div className="panel-body">
            <form role="form">
              <div className="form-group">
                <label htmlFor="search">topic:</label>
                <input value={this.state.topic} type="text" className="form-control" id="topic" onChange={this.handletopicChange} />
              </div>
              <div className="form-group">
                <label htmlFor="start-year">Start Year:</label>
                <input value={this.state.start} type="text" className="form-control" id="start" onChange={this.handlestartChange} />
              </div>
              <div className="form-group">
                <label htmlFor="end-year">End Year:</label>
                <input value={this.state.end} type="text" className="form-control" id="end" onChange={this.handleEndChange} />
              </div>
              <button href="#" type="submit" className="btn btn-default" id="run-search" onClick={this.handleSubmit}> Search</button>
              <button type="button" className="btn btn-default" id="clear-all">  Clear Results</button>
            </form>
          </div>
        </div>
        </div>
        </div>
    )
  }
});

module.exports = Search;
