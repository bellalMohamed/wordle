const fs = require('fs');
var os = require("os");

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('words.txt')
});

lineReader.on('line', function (line) {
    if ((line.length >= 5 && line.length <= 7) && !containsSpecialChars(line)) {
        writeToFile(line.toLowerCase());
    } 
});


function writeToFile(content) {
    fs.appendFile('output.txt', content + os.EOL, function (err) {
        if (err) throw err;
    });
}
  

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}