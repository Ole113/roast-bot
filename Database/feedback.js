const Enmap = require("enmap");
const feedback = new Enmap({ name: "feedback" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");

exports.run = async (message) => {
	if (message.author.bot) { return; }

	const key = message.guild.id;
	
	if (message.content.toLowerCase() === prefixFile.get(key, "prefix") + "feedback help") {
		return message.channel.send("coming soon");
	}
	feedback.defer.then(() => {

		if (message.content.toLowerCase().startsWith(prefixFile.get(key, "prefix") + "feedback ")) {

			const key = `${message.guild.id}-${message.author.id}`;

			if (!feedback.has(key)) {
				feedback.set(key, {
					user: message.author.id, guild: message.guild.id, feedbackNumber: 0, feedbackMessage: ""
				});
			}

			let content = message.content;
			let userFeedback = content.slice(prefixFile.get(key, "prefix").length + 9, content.length);

			let feedbackNumber = feedback.get(key, "feedback");

			feedback.set(key, userFeedback, "feedbackMessage");
			feedback.set(key, ++feedbackNumber, "feedbackNumber");
			message.delete();
			return message.channel.send("Feedback has been sent!");
		}
	});
};