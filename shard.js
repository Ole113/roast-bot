const { ShardingManager } = require("discord.js");
const { token } = require("./config.json")
const manager = new ShardingManager("./main.js", { token: token, totalShards: "auto" });


// We run a shard manager to make sure we can handle the amount of expected guilds (in this case: alot.)
manager.on("shardCreate", shard => {
    console.log(`Successfully launched shard ${shard.id}`);
});

manager.spawn();
