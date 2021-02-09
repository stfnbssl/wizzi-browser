/*
    artifact generator: C:\my\wizzi\stfnbssl\wizzi\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\stfnbssl\wizzi\packages\wizzi-utils\.wizzi\ittf\lib\lorem\index.js.ittf
*/
'use strict';
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function randomWord() {
    return words[randomInteger(0, words.length - 1)];
}
function randomSentence(lowerBound, upperBound) {
    var sentence = '',
        bounds = {
            min: 0, 
            max: randomInteger(lowerBound, upperBound)
        };
    while (bounds.min < bounds.max) {
        sentence += ' ' + randomWord();
        bounds.min++;
    }
    if (sentence.length) {
        sentence = sentence.slice(1);
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }
    return sentence;
}
function randomParagraph(lowerBound, upperBound, sentenceLowerBound, sentenceUpperBound) {
    var paragraph = '',
        bounds = {
            min: 0, 
            max: randomInteger(lowerBound, upperBound)
        };
    while (bounds.min < bounds.max) {
        paragraph += '. ' + randomSentence(sentenceLowerBound, sentenceUpperBound);
        bounds.min++;
    }
    if (paragraph.length) {
        paragraph = paragraph.slice(2);
        paragraph += '.';
    }
    return paragraph;
}
function generator(options) {
    options = options || {};
    var count = options.count || 20;
    var units = options.units || 'words',
        sentenceLowerBound = options.sentenceLowerBound || 5,
        sentenceUpperBound = options.sentenceUpperBound || 15,
        paragraphLowerBound = options.paragraphLowerBound || 3,
        paragraphUpperBound = options.paragraphUpperBound || 7,
        htmlTag = options.htmlTag || null,
        format = options.htmlTag ? 'html' : '',
        suffix = options.suffix;
    if (!suffix) {
        var isNode = typeof module !== 'undefined' && module.exports;
        var isReactNative = typeof product !== 'undefined' && product.navigator === 'ReactNative';
        var isWindows = typeof process !== 'undefined' && 'win32' === process.platform;
        if (!isReactNative && isNode && isWindows) {
            suffix = '\r\n';
        }
        else {
            suffix = '\n';
        }
    }
    var bounds = {min: 0, max: count},
        string = '',
        openingTag = htmlTag ? '<' + htmlTag + '>' : '',
        closingTag = htmlTag ? '</' + htmlTag + '>' : '';
    while (bounds.min < bounds.max) {
        switch (units.toLowerCase()) {
            case 'words': {
                string += ' ' + randomWord();
                break;
            }
            case 'sentences': {
                string += '. ' + randomSentence(sentenceLowerBound, sentenceUpperBound);
                break;
            }
            case 'paragraphs': {
                var nextString = randomParagraph(paragraphLowerBound, paragraphUpperBound, sentenceLowerBound, sentenceUpperBound);
                if (format === 'html') {
                    nextString = openingTag + nextString + closingTag;
                    if (bounds.min < bounds.max - 1) {
                        nextString += suffix;
                    }
                }
                else if (bounds.min < bounds.max - 1) {
                    nextString += suffix + suffix;
                }
                string += nextString;
                break;
            }
        }
        bounds.min++;
    }
    if (string.length) {
        var pos = 0;
        if (string.indexOf('. ') === 0) {
            pos = 2;
        }
        else if (string.indexOf('.') === 0 || string.indexOf(' ') === 0) {
            pos = 1;
        }
        string = string.slice(pos);
        if (units === 'sentences') {
            string += '.';
        }
    }
    return string;
}
var words = [
    'ad', 
    'adipisicing', 
    'aliqua', 
    'aliquip', 
    'amet', 
    'anim', 
    'aute', 
    'cillum', 
    'commodo', 
    'consectetur', 
    'consequat', 
    'culpa', 
    'cupidatat', 
    'deserunt', 
    'do', 
    'dolor', 
    'dolore', 
    'duis', 
    'ea', 
    'eiusmod', 
    'elit', 
    'enim', 
    'esse', 
    'est', 
    'et', 
    'eu', 
    'ex', 
    'excepteur', 
    'exercitation', 
    'fugiat', 
    'id', 
    'in', 
    'incididunt', 
    'ipsum', 
    'irure', 
    'labore', 
    'laboris', 
    'laborum', 
    'Lorem', 
    'magna', 
    'minim', 
    'mollit', 
    'nisi', 
    'non', 
    'nostrud', 
    'nulla', 
    'occaecat', 
    'officia', 
    'pariatur', 
    'proident', 
    'qui', 
    'quis', 
    'reprehenderit', 
    'sint', 
    'sit', 
    'sunt', 
    'tempor', 
    'ullamco', 
    'ut', 
    'velit', 
    'veniam', 
    'voluptate'
];
module.exports = generator;
