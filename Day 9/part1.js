const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var currPreamble = [];
var check;
var PreambleAmount = 25;

for (var x = 0; x < values.length; x++) {
    var currNum = Number(values[x]);
    if (x >= PreambleAmount) {
        for (var y = 0; y < PreambleAmount; y++) {
            for (var z = 0; z < PreambleAmount; z++) {
                check = (currPreamble[y] + currPreamble[z]) == currNum;
                if (check) { break; }
            }
            if (check) { break; }
        }
        if (check === false) { 
            console.log(currNum);
            break;
        }
        currPreamble.shift();
    }
    currPreamble.push(currNum);
}