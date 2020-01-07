"use strict";


exports.filesend = function (res, fileName, path) {
    var options = {
        root: path
    }

    res.sendFile(fileName, options, function (err) {
        if (err) {
            throw err;
        }
        else {

            console.log("File sent: " + fileName);
        }
    });
};

exports.jsonsend = function(res, jsonObject) {
    let jsonString = JSON.stringify(jsonObject);
    let printString = jsonString.length > 100? jsonString.slice(0, 99) + " ...": jsonString
    res.status(200);
    res.send(jsonString);
    console.log("Json sent: " + printString);
}
