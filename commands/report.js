const mongoose = require("mongoose");

let UpdateXPSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    points: Number,
    level: Number
});

module.exports = mongoose.model("roast-bot-beta-tests", UpdateXPSchema);