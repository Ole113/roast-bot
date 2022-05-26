const { ShardingManager } = require("discord.js");
import { TOKEN } from "./token.js";

const manager = new ShardingManager("main.js", { token: TOKEN, totalShards: "auto" });

manager.spawn();

manager.on("shardCreate", shard => {
    console.log(`Successfully launched shard ${shard.id}`);
});