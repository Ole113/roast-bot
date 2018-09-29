const prefix_file = require("../Database/prefix.json");

exports.run = async (message) => {
    if(message.content.toLowerCase == prefix_file.prefix + "test") {
        console.log(prefix_file.prefix);
        return message.channel.send("Worked");
    }
}