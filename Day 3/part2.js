const fs = require("fs");

var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var positions = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

var rowLength = values[0].length;
var totalTrees = 1; // Set to one as we multiply

function treeCounter(moveX, moveY) {
    var numTrees = 0;
    var currX = moveX;
    var currY = moveY;

    while (currY < values.length) {
        var location = values[currY][currX];
        if (location === "#") { numTrees++; }

        currY += moveY;
        currX = (currX + moveX) % rowLength;
    }

    return numTrees;
}

for (var x = 0; x < positions.length; x++) {
    totalTrees = treeCounter(positions[x][0], positions[x][1]) * totalTrees;
}

console.log(totalTrees);