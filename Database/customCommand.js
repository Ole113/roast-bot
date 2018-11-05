const discord = require("Discord.js");

const prefixFile = require("./prefix.json");

exports.run = async (message) => {
  if(message.content.toLowerCase().startsWith(prefixFile.prefix + "command ")) {
    var message = message.content;

    var indexOfFirst = paragraph.indexOf(" ");

    let commandName = message.slice(prefixFile.prefix.length + 8, message.indexOf(" ", (indexOfFirst + 1)));
    //console.log('The index of the first "' + searchTerm + '" from the beginning is ' + indexOfFirst);

    //console.log('The index of the 2nd "' + searchTerm + '" is ' + paragraph.indexOf(searchTerm, (indexOfFirst + 1)));
 var message = 'r!command test test2 test3';

var indexOfFirst = message.indexOf(" ");
var indexOfSecond = message.indexOf(" ", 10);
var indexOfThird = message.lastIndexOf(" ");


console.log(message.slice(indexOfFirst + 1, indexOfSecond + 1));
console.log(message.slice(indexOfSecond + 1, indexOfThird));

console.log(message.slice(indexOfThird + 1, message.length));
  }
}
