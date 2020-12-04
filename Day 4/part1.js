const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class Passport {
    constructor() {
        this.byr = "";
        this.iyr = "";
        this.eyr = "";
        this.hgt = null;
        this.hcl = null;
        this.ecl = null;
        this.pid = "";
        this.cid = null;
    };

    validatePassport() {
        return (this.byr && this.iyr && this.eyr && this.hgt && this.hcl && this.ecl && this.pid);
    };
}

var PassportQueue = [];
var index = 0;
var count = 0;
var currPassport = new Passport();
PassportQueue.push(currPassport);

while (index < values.length) {
    var currLine = values[index].trim();
    if (currLine.length > 1) {  
        var givenValues = currLine.split(" ");
        for (var x = 0; x < givenValues.length; x++) {
            currPassport[givenValues[x].substring(0, 3)] = givenValues[x].substring(4);
        }
    } else {
        if (currPassport.validatePassport()) { count++; }
        currPassport = new Passport();
        PassportQueue.push(currPassport);
    }
    index++;
};

console.log(count);