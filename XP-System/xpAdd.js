/*
*
*   Things to add to XP-Add:
* ----------------------------
*
*/
const Discord = require("discord.js");

const mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/XP-System");

const mongodb = require("mongodb");
var x = new mongodb("localhost:27017");
var db = x.getDB("XP-System");
exports.run = async () => {

}

