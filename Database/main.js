const cassandra = require("cassandra-driver");
const CasClient = new cassandra.Client({ contactPoints: ['h1', 'h2'], keyspace: 'roastBotXp' });
const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = async () => {
console.log("Connected to Cassandra Driver");
}