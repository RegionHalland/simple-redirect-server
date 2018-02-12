var srs = require("../index");

//Init server
srs.init({
    portListen: 1337, //HTTP server will listen on this
    httpStatusCode: 301, //For example 301,
    csvFile: "./redirects.csv"
});