const fs = require('fs');
var os = require("os");


let wordLength = 0;
let rightLetters = '';
let rightLettersInPosition = '';
let wrongLetters = '';
let wrongLettersPosition = [];

process.argv.forEach(function (val, index, array) {
    if (index == 2) {
        wordLength = val;
        console.log(wordLength)
    } else if (index == 3) {
        rightLetters = rightLetters + val;
    } else if (index == 4) {
        rightLettersInPosition = rightLettersInPosition + val;
    } else if (index == 5) {
        wrongLetters = wrongLetters + val;
    } else if (index > 5) {
        wrongLettersPosition.push(val);
    }
});


var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('output.txt')
    // input: require('fs').createReadStream('sample.txt')
});


console.log(guess(wordLength, lineReader, rightLetters, rightLettersInPosition, wrongLetters, wrongLettersPosition));

function guess(wordLength, lineReader, rightLetters, rightLettersInPosition, wrongLetters, wrongLettersPosition) {
    let possibleRightWords = [];

    lineReader.on('line', function (word) {
        if (word.length != wordLength) {
            return;
        }
        let rightWord = hasrightLetters(word, rightLetters) &&
            !hasWrongLetters(word, wrongLetters) &&
            hasRightLetterInPosition(word, rightLettersInPosition) && 
            !hasWrongLetterInPosition(word, wrongLettersPosition);
        
        if (rightWord) {
            // console.log(word, rightWord);
            possibleRightWords.push(word);
            // console.log(possibleRightWords)
            // console.log(word);
        }
        
    });
    setTimeout(() => console.log(possibleRightWords), 1000);
    
}

function hasrightLetters(word, rightLetters) {
    for (const letter of rightLetters) {
        if (!word.includes(letter)) {
            return false;
        }
    }
    return true;
}

function hasWrongLetters(word, wrongLetters) {
    let wrong = false;
    for (const wrongLetter of wrongLetters) {
        
        if (word.includes(wrongLetter)) {
            wrong = true;
        }
    }

    // console.log("has wrong letter: ", wrong);
    return wrong;
}

function hasRightLetterInPosition(word, rightLettersInPosition) {
    let right = true;
    for (let i = 0; i < rightLettersInPosition.length; i++) {
        let rightLetterInPosition = rightLettersInPosition[i];
        if (rightLetterInPosition != '-') {
            if (word[i] != rightLetterInPosition) {
                right = false;
            }
        }   
    }

    // console.log("has right letter in p: ", right);
    return right;
}


function hasWrongLetterInPosition(word, wrongLettersPosition) {
    let wrong = false;
    console.log(wrongLettersPosition);
    for (const wrongLettersPositionCase of wrongLettersPosition) {
        console.log(wrongLettersPositionCase);
        for (let i = 0; i < wrongLettersPositionCase.length; i++) {
            let wrongLetterPosition = wrongLettersPositionCase[i];
            if (wrongLetterPosition != '-') {
                console.log(word, i, wrongLetterPosition);
                if (word[i] == wrongLetterPosition) {
                    wrong = true;
                }
            }   
        }   
    }
    

    // console.log("has wrong letter in p: ", wrong);
    return wrong;
}

