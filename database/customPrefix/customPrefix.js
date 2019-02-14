//add custom prefix help
//MAKE SURE IT IS CLEAR YOU CAN ONLY SET IT WITH rb!
const connection = require("../../dbConnect.js");

exports.run = async (message) => {
    //returns what the prefix is and who set it.
    if (message.content.toLowerCase() == "rb!prefix") {
        let getPrefix = connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
            if (err) console.log(err);
            //checks if prefix has been set or not.
            if (!result.length) {
                return message.channel.send("No admins in your server have set a custom prefix yet so the prefix is still the default, rb!.");
            } else {
                return message.channel.send(`Your server prefix is *${result[0].prefix}* and was set by *${result[0].username}*.`);
            }
        });
    }
    
    if (message.content.toLowerCase().startsWith("rb!" + "prefix ") && message.member.hasPermission("ADMINISTRATOR")) {

        const newPrefix = message.content.slice("rb!".length + 7, message.content.length);

        //is the param passed into the query and is updated depending on if the user is already in the db.
        let updatePrefix;

        connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
            if (err) console.log(err);

            //if the user isn't in the db create a row for the new user.
            if (!result.length) {
                updatePrefix = `INSERT INTO roast_bot_custom_prefix (guildID, username, prefix) VALUES ("${message.guild.id}", "${message.author.username}", "${newPrefix}");`;
            } else {
                //if the user if in the db then update the prefix to the new prefix.
                updatePrefix = `UPDATE roast_bot_custom_prefix SET username = "${message.author.username}", prefix = "${newPrefix}" WHERE guildID = "${message.guild.id}";`;
            }

            //the query that updatePrefix is passed to.
            connection.query(updatePrefix, function (err, result) {
                if (err) console.log(err);
            });

            //gets the prefix so that the user knows what the prefix was set to.
            let getPrefix = connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
                if (err) console.log(err);
                return message.channel.send(`Your server prefix has been set to *${result[0].prefix}*.`);
            });
        });
    } else if (message.content.toLowerCase().startsWith("rb!" + "prefix ") && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("Sorry, you need to be an admin to set the custom prefix for your server. <:roast_circle:474755210485563404>");
    }

    connection.query(`SELECT * FROM roast_bot_custom_prefix WHERE guildID = "${message.guild.id}";`, function (err, result) {
        //makes a variable that will be rewritten every time the query is called, default is rb!.
        let prefix = "rb!";
    
        if (err) console.log(err);
        //checks if prefix has been set or not and sets prefix to it.
        if (result.length) prefix = result[0].prefix;
        exports.prefix = prefix;
    });
}