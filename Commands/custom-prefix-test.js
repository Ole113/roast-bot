const customP = require("./Database/custom-prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase() == customP.prefix + "test"){
        return message.channel.send(`Custom Prefix is ${customP.prefix}`);
    }
}