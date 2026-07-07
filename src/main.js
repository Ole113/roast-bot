const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Options, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');

const client = new Client({
	makeCache: Options.cacheWithLimits({
		...Options.DefaultMakeCacheSettings,
		ReactionManager: 0,
		GuildMemberManager: {
			maxSize: 100,
			keepOverLimit: member => member.id === client.user.id,
		},
	}),
	intents: [GatewayIntentBits.Guilds],
	sweepers: {
		...Options.DefaultSweeperSettings,
		messages: {
			interval: 1800,
			lifetime: 900,
		},
		users: {
			interval: 1800,
			filter: () => user => user.bot && user.id !== client.user.id,
		},
	},
	shards: getInfo().SHARD_LIST,
	shardCount: getInfo().TOTAL_SHARDS
});

client.cluster = new ClusterClient(client);
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ("data" in command && "execute" in command) client.commands.set(command.data.name, command);
	else {
		console.log(`main.js 17: [WARNING]: The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

client.login(token);