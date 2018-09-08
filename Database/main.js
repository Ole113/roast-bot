const cassandra = require("cassandra-driver");
const CasClient = new cassandra.Client({ contactPoints: ["127.0.0.1"], keyspace: "roastbotxp" });


exports.run = async () => {
    console.log("Connected to Cassandra Driver");

    const query = "INSERT INTO roastbotxptable (user_id_xp, user_xp) VALUES(?, ?)";

    CasClient.execute(query, ["Test_id", "0"])
    .then(result => console.log("Test values added :)", result.rows[0])).catch(error => {
        console.log(error);
    })

}