const custom = require("./Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase() == custom.prefix + "test"){
        return message.channel.send(`Prefix is ${custom.prefix}`);
    }
}