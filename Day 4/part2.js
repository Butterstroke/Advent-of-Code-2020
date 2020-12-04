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

        this.validECL = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    };

    validatehgt() {
        if (!this.hgt) { return false; }
        var hgt = Number(this.hgt.substring(0, this.hgt.length - 2));
        var measure = this.hgt.substring(this.hgt.length - 2);

        if (measure === "cm") {
            if (hgt < 150 || hgt > 193) { return false; }
            return true;
        } 
        if (measure === "in") {
            if (hgt < 59 || hgt > 76) { return false; }
            return true;
        } 

        return false;                
    };

    validatePassport() {
        if (Number(this.byr) > 2002 || Number(this.byr) < 1920) { return false; }
        if (Number(this.iyr) > 2020 || Number(this.iyr) < 2010) { return false; }
        if (Number(this.eyr) > 2030 || Number(this.eyr) < 2020) { return false; }
        if (!this.validatehgt()) { return false; }
        if (!/^#[0-9a-f]{6}$/.test(this.hcl)) { return false; }
        if (!this.ecl || !this.validECL.includes(this.ecl)) { return false; }
        if (this.pid.length != 9 || Number(this.pid) === NaN) { return false; }

        return true;
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