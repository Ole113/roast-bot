const Enmap = require("enmap");
const feedback = new Enmap({ name: "feedback" });
const bsp = require("better-sqlite-pool");

const prefixFile = require("./prefix.json");

exports.run = async (message) => {
	if (message.author.bot) { return; }

	const key = message.guild.id;
	const prefix = String(prefixFile.get(key, "prefix"));
	if (message.content.toLowerCase() === prefix + "feedback help") {
		return message.channel.send("coming soon");
	}
	feedback.defer.then(() => {

		if (message.content.toLowerCase().startsWith(prefix + "feedback ")) {

			const key = `${message.guild.id}-${message.author.id}`;

			if (!feedback.has(key)) {
				feedback.set(key, {
					user: message.author.id, guild: message.guild.id, feedbackNumber: 0, feedbackMessage: ""
				});
			}

			let content = message.content;
			let userFeedback = content.slice(prefix.length + 9, content.length);

			let feedbackNumber = feedback.get(key, "feedback");

			feedback.set(key, userFeedback, "feedbackMessage");
			feedback.set(key, ++feedbackNumber, "feedbackNumber");
			message.delete();
			return message.channel.send("Feedback has been sent!");
		}
	});
};
