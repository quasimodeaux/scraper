const cheerio = require("cheerio");
const request = require("request");
const express = require("express");
const mongojs = require("mongojs");

var db = mongojs('spaceStuff');
var myCollection = db.collection('spaceCollection');

const $ = require("cheerio");

var url = "https://www.reddit.com/r/woahdude/";

request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // Print the HTML for the Google homepage.

    var $ = cheerio.load(body);


    $('p.title').each( function(i, element){
        var title = $(element).children('a').attr("title", "rel title").text();
        console.log(title)
        var text = $(element).children('a').attr("href");
        console.log(text)

        if (text != null){
            db.spaceStuff.insert({
                    title: text
                }, function(err, data){
                    if (err){
                        console.log(err)
                    }
                    else{
                        console.log(data)
                    }
                }
            )
        }

    })



});






