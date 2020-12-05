const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var planeSize = 128;
var planeCols = 8;

function calulateRow(value) {
    var posMin = 0;
    var posMax = planeSize;

    for (var x = 0; x < value.length; x++) {
        var char = value[x];
        var change = Math.floor((posMax - posMin) / 2);
        if (char === "F") {
            posMax -= change;
        } else {
            posMin += change;
        }
    }

    return posMax - 1;
};

function calulateCol(value) {
    var posMin = 0;
    var posMax = planeCols;

    for (var x = 0; x < value.length; x++) {
        var char = value[x];
        var change = Math.floor((posMax - posMin) / 2);
        if (char === "L") {
            posMax = posMax - change;
        } else {
            posMin = posMin + change;
        }
    }

    return posMin;
};

function findSeatID(value) {
    return calulateRow(value.substring(0, 7)) * 8 + 
        calulateCol(value.substring(7));
}

var highestSeatID = 0;
for (var x = 0; x < values.length; x++) {
    var SeatID = findSeatID(values[x]);
    if (SeatID > highestSeatID) { highestSeatID = SeatID; }
}

console.log(highestSeatID);