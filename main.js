const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const {fs} = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');

const client = new Client({ intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages
    ]
});

client.commands = new Collection();

// Retrieval of all the commands.
cmdPath = path.join(__dirname, 'commands')
for (const cmdFile in fs.readdirSync(cmdPath).filter(file => file.endsWith('.js'))) {
    const command = require(path.join(cmdPath, cmdFile));
    client.commands.set(command.data.name, command)
}

client.once(Events.ClientReady, c => {
    console.log("-----------------------------------");
    console.log("Roast-Bot is Ready");
    console.log("-----------------------------------");

    client.shard.fetchClientValues('guilds.cache.size')
        .then(result => {
            console.log(`${results.reduce((acc, guildCount) => acc + guildCount, 0)} total guilds`);
        })
        .catch(console.error);
        client.user.setActivity(`Now with slash commands!`, { type: 'PLAYING' });
});
 
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
       await command.execute(interaction);
    } catch(error) {
        console.error(`${interaction.commandName} Failed: ${error}`);
        await interaction.reply( {content: 'An unexpected error occured.', ephemeral: true});
    }
})

client.login(token)