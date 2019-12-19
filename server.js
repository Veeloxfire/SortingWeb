

const folderpath = "D:/NodeJS/Sorting/SortingWeb/";

const fileIO = require("./scripts/fileIO.js");
var Algorithms = require("./scripts/Algorithms.js").Algorithms;

var express = require("express");
var app = express();


app.get("/", function (req, res) {
    if (req.query.Sort != null) {

        var Output = Algorithms.Start(req.query.Sort, req.query.Type, req.query.Length, req.query.Range, req.query.Seed);

        fileIO.jsonsend(res,Output);
    }
    else {
        fileIO.filesend(res, "SortingAlgorithms.html", folderpath + "/WebFiles/");
    }

});


app.get("/Handler.js", function (req, res) {
    fileIO.filesend(res, "Handler.js", folderpath + "/WebFiles/");
});

app.get("/render.js", function (req, res) {
    fileIO.filesend(res, "render.js", folderpath + "/WebFiles/");
});
    
app.get("/Styling.css", function (req, res) {
    fileIO.filesend(res, "Styling.css", folderpath + "/WebFiles/");
});

app.get("/Selector.js", function (req, res) {
    fileIO.filesend(res, "Selector.js", folderpath + "/WebFiles/");
});


app.listen(1337);




