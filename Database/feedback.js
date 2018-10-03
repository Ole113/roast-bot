const Enmap = require("enmap");
const feedback = new Enmap({name: "feedback"});
const bsp = require("better-sqlite-pool");

const prefix_file = require("./prefix.json");

exports.run = async (message) => {
   if(message.content.toLowerCase() == prefix_file.prefix + "feedback help") {
      return message.channel.send("coming soon");
   }
	 customPrefix.defer.then(() => {
   		if(message.author.bot) return;
		if(message.content.toLowerCase().startsWith(prefix_file.prefix + "feedback ")) {
    
      let content = message.content;
      let userFeedback = content.slice(prefix_file.prefix.length + 9, content.length);
    
			const key = `${message.guild.id}-${message.author.id}`;
      
			if(!feedback.has(key)) {
			  feedback.set(key, {
				user: message.author.id, guild: message.guild.id, feedbackNumber: 1, feedbackMessage: ""
			  });
			}

			feedback.set(key, userFeedback, "feedbackMessage");
      feedback.set(key, ++feedbackNumber, "feedbackNumber");
      
      return message.channel.send("Feedback has been sent!");
		}
   }
}
