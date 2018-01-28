const React = require("react");
const helpers = require('../utils/helpers');
const axios = require('axios');

const Search = require('./Search');
const Query = require('./Query');
const Saved = require('./Saved');

const Main = React.createClass({

	getInitialState: function() {
		return {
			topic: "",
			start: "",
			end: "",
			results: [],
			savedArticles: []
		}
	},

	setParent: function(topic, start, end) {
		this.setState({
			topic: topic,
			startYear: start,
			endYear: end
		});
	},

	saveArticle: function(title, date, url) {
		helpers.postArt(title, date, url);
		helpers.getSaved();
	},


	componentDidUpdate: function(prevProps, prevState) {

		if(this.state.topic != prevState.topic) {
		helpers.searchQuery(this.state.topic, this.state.start, this.state.end)
      		.then(function(data) {this.setState({ results: data});
      }.bind(this));}

      },

	render: function() {
		return(
			<div className="container">
				<div className="container">
					<div className="jumbotron">
						<h3 className="text-center">New York Times React </h3>
					</div>
				</div>
				<Search setParent={this.setParent} />
				<Query results={this.state.results} saveArticle={this.saveArticle}/>
				<Saved savedArticles={this.state.savedArticles} deleteArticle={this.state.deleteArticle} />
			</div>


		)
	}
});
module.exports = Main;
