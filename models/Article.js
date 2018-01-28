var mongoose = require("mongoose");
const bluebird = require('bluebird');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var article = new Schema ({
  title: {type: String, required: true},
  link: {type: String, required: true},
  date: {type: Date}
});

var Article = mongoose.model("Article", article);

module.exports = Article;
