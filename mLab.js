/*
*
*  Things to add to Database:
* ----------------------------
*  Custom prefix.
*  Custom Roast adding.
*  Custom Meme adding.
*  When you level up stil send the command that they did but then do the level up thing.
*  Make it so people cannot spam Roast-Bot commands to get more XP.
*
*/
const Discord = require("discord.js")
const client = new Discord.Client();
//const mLabHidden_file = require("./mLabHidden.json");
var mLab = require('mongolab-data-api')("mibGkayB-6avS1d89zaKFVHCLEZB5i8OmibGkay");

exports.run = async(message) => {
client.on('message', message => {
    if (message.content.startsWith("r!")) {
        var options = {
            database: 'roast-bot-ole113',
            collectionName: member.guild.id,
            query: `{"id": ${message.member.id} }`
        };
        mLab.listDocuments(options, function (err, data) { member = data });
        member.exp += 1;
        options = {
            database: 'roast-bot-ole113',
            collectionName: member.guild.id,
            query: `{"id": ${message.member.id} }`,
            document: member
        };
        mlab.updateDocuments(options, function () {
            console.log(`${message.member.nickname} gained 25 exp`)
        });
    }
});
client.on("guildCreate", guild => {
    var options = {
        database: "roast-bot-ole113",
        collectionName: guild.id,
        documents: []
    };
    guild.members.forEach(function (member) {
        options.documents.push({
            id: member.id,
            exp: 0
        });
    });
    options.documents.push({
        id: guild.id,
        queue: []
    });
    options.documents.push()
    mLab.insertDocuments(options)
    console.log("Joined a server")
});
client.on("guildDelete", guild => {
    guild.members.forEach(function (member) {
        var options = {
            database: "roast-bot-ole113",
            collectionName: guild.id
        }
        mLab.deleteDocuments(options, function (err, data) {
            console.log("Left a server");
        });
    });
});
}
