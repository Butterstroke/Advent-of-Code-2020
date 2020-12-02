const fs = require("fs");

var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class passwordValidation {
    /**
     * @param {Number} positionOne 
     * @param {Number} positionTwo 
     * @param {String} validChar 
     * @param {String} password 
     */
    constructor(positionOne, positionTwo, validChar, password) {
        this.positionOne = positionOne;
        this.positionTwo = positionTwo;
        this.validChar = validChar;
        this.password = password;
    };

    testValidity() {
        return ((this.password[positionOne - 1] == this.validChar) != (this.password[positionTwo - 1] == this.validChar));
    }
}

var count = 0;

for (var x = 0; x < values.length; x++) {
    var parsedValues = values[x].split(" ");
    var positionOne = Number.parseInt(parsedValues[0].split("-")[0]);
    var positionTwo = Number.parseInt(parsedValues[0].split("-")[1]);

    var tempPass = new passwordValidation(positionOne, positionTwo, parsedValues[1].substring(0, 1), parsedValues[2]);

    if (tempPass.testValidity()) { count++; }
}

console.log(count);