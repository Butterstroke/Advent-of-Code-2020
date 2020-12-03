const fs = require("fs");

var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var moveX = 3;
var moveY = 1;

var currX = moveX;
var currY = moveY;

var numTrees = 0;
var rowLength = values[0].length;

while (currY < values.length) {
    var location = values[currY][currX];
    if (location === "#") { numTrees++; }

    currY += moveY;
    currX = (currX + moveX) % rowLength;
}

console.log(numTrees);