const { ClusterManager } = require("discord-hybrid-sharding");
const { token } = require("../config.json")

const manager = new ClusterManager(`${__dirname}/main.js`, {
    totalShards: "auto",
    totalClusters: "auto",
    shardsPerClusters: 2,
    mode: "process",
    token,
    respawn: true
});

manager.on("clusterCreate", cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn(manager.totalShards, 15000, -1).catch(e => {console.log(e)});