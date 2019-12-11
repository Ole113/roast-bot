const { ShardingManager } = require("discord.js");
const manager = new ShardingManager(`Roast-Bot/main.js`, { totalShards: "auto" });

manager.spawn();
manager.on("launch", shard => console.log(`Successfully launched shard ${shard.id}`));
client.shard.fetchClientValues('guilds.size').then(console.log);