const xp_level_file = require("./Database/xp-level.js");

exports.run = async (message) => {
	/*
	*
	*   Things to add to Database:
	*  ----------------------------
	*  Custom prefix.
	*  Custom Roast adding.
	*  Custom Meme adding.
	*  When you level up stil send the command that they did but then do the level up thing.
	*  Make it so people cannot spam Roast-Bot commands to get more XP.
	*
	*/

	xp_level_file.run();
}