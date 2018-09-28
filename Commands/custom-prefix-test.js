const customP = require("./custom-prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase() == customP.prefix + "test"){
        return message.channel.send(`Prefix is ${customP.prefix}`);
    }
}