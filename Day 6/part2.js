const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var yesCount = 0;

class GroupAnswers {
    constructor() {
        this.PersonAnswers = [];
    }

    add(value) {      
        this.PersonAnswers.push(value);
    }

    getMatches() {
        if (this.PersonAnswers.length == 1) { return this.PersonAnswers[0].length; }
        var currMatches = this.PersonAnswers[0].split("");

        for (var x = 1; x < this.PersonAnswers.length; x++) {
            this.PersonAnswers[x].split("").forEach(item => currMatches.push(item));
            currMatches = currMatches.filter(
                (element, index, arr) => arr.indexOf(element) !== index
            );
        }
        return currMatches.length;
    }
}

for (var x = 0; x < values.length; x++) {
    var currLine = values[x];

    if (currLine != "") {
        currGroup.add(currLine);

        if (x + 1 === values.length) {
            yesCount += currGroup.getMatches(); // Count remaining group.
        }
    } else {
        yesCount += currGroup.getMatches();
        currGroup = new GroupAnswers();
    }    
};

console.log(yesCount);