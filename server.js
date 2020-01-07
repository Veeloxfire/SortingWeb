const path = require('path')
const fileIO = require("./scripts/fileIO.js");
var Algorithms = require("./scripts/Algorithms.js").Algorithms;

var express = require("express");

const folderpath = __dirname;
const PORT = 3000


var app = express();


function logOriginalUrl(req, res, next){
    console.log('Request URL:', req.originalUrl)
    next()
}

function logIP(req, res, next){
    console.log('Request IP:', req.ip)
    next()
}

function logIsSecure(req, res, next){
    let state = req.secure? "True":"False"
    console.log('Secure? :', state)
    next()
}

function logTime(req, res, next){
    console.log(new Date(), '\n')
    next()
}

const middleWare = [logOriginalUrl, logIP, logIsSecure, logTime]


app.get("/", middleWare, function (req, res) {
    if (req.query.Sort != null) {

        var Output = Algorithms.Start(req.query.Sort, req.query.Type, req.query.Length, req.query.Range, req.query.Seed);

        fileIO.jsonsend(res,Output);
    }
    else {
        fileIO.filesend(res, "SortingAlgorithms.html", folderpath + "/WebFiles/");
    }

});


app.get("/Handler.js", middleWare, function (req, res) {
    fileIO.filesend(res, "Handler.js", folderpath + "/WebFiles/");
});

app.get("/render.js", middleWare, function (req, res) {
    fileIO.filesend(res, "render.js", folderpath + "/WebFiles/");
});
    
app.get("/Styling.css", middleWare, function (req, res) {
    fileIO.filesend(res, "Styling.css", folderpath + "/WebFiles/");
});

app.get("/Selector.js", middleWare, function (req, res) {
    fileIO.filesend(res, "Selector.js", folderpath + "/WebFiles/");
});


app.listen(PORT);
console.log(`Hosted on port: ${PORT}`, "Press ctrl + C to stop")




