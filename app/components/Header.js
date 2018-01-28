var React = require("react");


var Header = React.createClass({

	render: function() {
		return(
			<div className="container">
				<div className="jumbotron">
					<h1 className="text-center"><strong> NYT React </strong></h1>
				</div>
			</div>


		)
	}
});
module.exports = Header;
