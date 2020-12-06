const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var yesCount = 0;
var currGroup = [];

for (var x = 0; x < values.length; x++) {
    var currLine = values[x];

    if (currLine != "") {
        for (var y = 0; y < currLine.length; y++) {
            var currChar = currLine[y];
    
            if (!currGroup.includes(currChar)) {
                currGroup.push(currChar);
                yesCount++;
            }
        }
    } else {
        currGroup = [];
    }    
};

console.log(yesCount);