const { Events } = require("discord.js");

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setPresence({ activities: [{ name: "/roast" }], status: "online" });

		// https://discordjs.guide/sharding/#putting-them-together
		const promises = [
			//client.shard.fetchClientValues("guilds.cache.size"),
			//client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
		];

		Promise.all(promises)
			.then(results => {
				//const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				//const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
				//const largestGuilds = results[1].sort((a, b) => b - a).slice(0, 5);

				//console.log(`[INFO]: ${totalGuilds} total guilds!\n[INFO]: ${totalMembers} total users!`);
				//console.log(largestGuilds);
			})
			.catch(e => { });
	}
};