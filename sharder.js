const { ShardingManager } = require("discord.js");
const manager = new ShardingManager(`${__dirname}main.js`, { totalShards: "auto" });

manager.spawn();
manager.on("launch", shard => console.log(`Successfully launched shard ${shard.id}`));