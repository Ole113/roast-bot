const Enmap = require("enmap");
const feedback = new Enmap({ name: "feedback" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");

exports.run = async (message) => {
	if (message.content.toLowerCase() == prefixFile.prefix + "feedback help") {
		return message.channel.send("coming soon");
	}
	feedback.defer.then(() => {
		if (message.author.bot) return;

		if (message.content.toLowerCase().startsWith(prefixFile.prefix + "feedback ")) {
			
			const key = `${message.guild.id}-${message.author.id}`;

			if (!feedback.has(key)) {
				feedback.set(key, {
					user: message.author.id, guild: message.guild.id, feedbackNumber: 0, feedbackMessage: ""
				});
			}

			let content = message.content;
			let userFeedback = content.slice(prefixFile.prefix.length + 9, content.length);

			let feedbackNumber = feedback.get(key, "feedback");

			feedback.set(key, userFeedback, "feedbackMessage");
			feedback.set(key, ++feedbackNumber, "feedbackNumber");

			return message.channel.send(`Feedback has been sent!`);
		}
	});
};