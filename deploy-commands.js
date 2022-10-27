const {REST, Routes} = require('discord.js');
const {clientID, token} = require('./config.json');
const fs = require('node:fs');

// Retrieving all commands from ./commands folder.
commands = [];
for (const commandFile of fs.readdirSync('./commands').filter(file => file.endsWith('.js'))) {
    const command = require(`./commands/${commandFile}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({version: '10'}).setToken(token);

// Async deployment of commands to register them on discord.
(async () => {
    try {
        console.log(`attemtping to deploy: ${commands.length} application commands.`)

        const data = await rest.put(
            Routes.applicationCommands(clientID),
            {body: commands},
        );

        console.log('All application commands was successfully deployed')
    } catch (error) {
        console.error(`Unable to deploy commands: \n\n ${error}`)
    }
})();