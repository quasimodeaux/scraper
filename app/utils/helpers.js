const axios = require("axios");


const helper = {
//
    searchQuery: function(topic, start, end) {
        console.log(" START YR " + start);
        var apiKey = "769f2ad0d52b43bbb9836c132e41d884";
        // These variables will hold the results we get from the user's inputs via HTML
        var searchTopic = topic.trim();
        var startYear = start.trim() + "0101";
        var endYear = end.trim() + "1231";
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTopic + "&?begin_date=" + startYear + "&?end_date" + endYear + "+&api-key=" + apiKey;

        return axios.get(queryURL, {

        }).then(function(response) {

            return response.data.response.docs;
        });
    },

    getSaved: function() {
        return axios.get("/api/saved")
            .then(function(results) {
                return results;
            });
    },

    // This function posts new searches to our database.
    postArt: function(title, date, link) {
        var newArticle = {title: title, date: date, link: link};
        return axios.post("/api/saved", newArticle)
            .then(function(results) {
                return results._id;
            });
    },


};

// We export the API helper
module.exports = helper;
