const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const Provider = require("enmap-sqlite");
client.points = new Enmap({provider: new Provider({name: "points"})});

const roasts = [
	{"roast":"Id offer you some gum but your smiles got plenty of it"},
	{"roast":"Repeat After me: semen is not hair gel"},
	{"roast":"Your body fat is about as evenly distributed as wealth in the US economy"},
	{"roast":"Your like dobby from harry potter, only people wont be sad when you die in the seventh book"},
	{"roast":"If I asked you about your cock it wouldnt be a very long conversation"},
	{"roast":"You sound like a founder of a start up company that makes male tampons"},
	{"roast":"You have the kinds of looks that make people talk about your personality"},
	{"roast":"You look like what happens when you press random on the charecter creation menu"},
	{"roast":"You look like the after picture of a meth ad"},
	{"roast":"Even the shower doesnt want to see you naked"},
	{"roast":"I bet you wear a nose ring because no one wants to put one on your finger"},
	{"roast":"You must hear \"lets be friends often\" I mean \"lets be cousins\" alot"},
	{"roast":"When the airforce needs extra landing space they should just rent out your forehead"},
	{"roast":"If laughter is the best medicine, your face must be curing the world"},
	{"roast":"If I wanted a bitch Id have bought a dog"},
	{"roast":"The only way you will ever get laid is if you crawl up a chickens ass and wait"},
	{"roast":"It looks like your face caught fire and someone tried to put it out with a hammer"},
	{"roast":"Your family tree must be a cactus because everyone on it is a prick"},
	{"roast":"Save your breath - youre going to need it to blow up your date"},
	{"roast":"Your proof evolution can go in reverse"},
	{"roast":"When you were born, the doctor came out to the waiting room and said to your dad, \"I'm very sorry. We did everything we could. But he pulled through.\""},
	{"roast":"You've got less meat in your pants than there is in a vegetarian restaurant"},
	{"roast":"I wasn't born with enough middle fingers to let you know how I feel about you"},
	{"roast":"Your birth certificate is an apology letter from the condom factory"},
	{"roast":"You're about as useful as a vibrator with no batteries"},
	{"roast":"Fake hair, fake nails, fake smile. Are you sure you weren't made in China?"},
	{"roast":"Mirrors can't talk, and lucky for you they can't laugh either"},
	{"roast":"I'd say you're funny, but looks aren't everything"},
	{"roast":"You must have been born on a highway because thats where most accidents happen"},
	{"roast":"When I see your face theres not a thing I would change... Except for the direction im walking in"},
	{"roast":"Your so ugly when you popped out the doctor said aww what a treasure and your mom said yeah lets bury it"},
	{"roast":"I hear when you were a child your mother wanted to hire somebody to take care of you, but the mafia wanted too much"},
	{"roast":"You're so fat the only letters of the alphabet you know are KFC"},
	{"roast":"The only positive thing about you is your HIV status"},
	{"roast":"You're like STDs, nobody wants you, everyone hates you and it proves your parents should have used protection"},
	{"roast":"The only way I'd lay naked with you would be in a mass grave"},
	{"roast":"You're the cum your mother should have swallowed"},
	{"roast":"I heard your mom got fired from her job at the sperm bank - the boss caught her drinking on the job"},
	{"roast":"You should wear a condom on your head because if you're gonna act like a dick you might as well dress like one!"},
	{"roast":"Twinkle twinkle little star, I want to hit you with my car, Throw you off a cliff so high, I hope you break your neck and die"},
	{"roast":"Some babies were dropped on their heads but you were clearly thrown at a wall"},
	{"roast":"Roses are red, shit is brown, shut the fuck up, and sit the fuck down"},
	{"roast":"Fashion Tip 101: You only need to wear one pair of socks at a time and they belong on your feet not in your bra"},
	{"roast":"I see you were so impressed with your first chin that you added two more"},
	{"roast":"Twinkle twinkle little whore, close your legs, they're not a door"},
	{"roast":"I guess those penis enlargement pills are working - you're twice the dick you were yesterday!"},
	{"roast":"Twinkle Twinkle little slut, name a guy you haven't fucked, was he skinny, was he tall, Nevermind you did them all"},
	{"roast":"I failed a spelling test because they asked me how to spell 'bitch' and I wrote down your name"},
	{"roast":"You're like a light switch, even a little kid can turn you on"},
	{"roast":"I don't see any penises in the general vicinity... So I'm wondering why you keep opening your fucking mouth"},
	{"roast":"Who lit the fuse on your tampon?"},
	{"roast":"I thought bra's are meant for boobs not tissues"},
	{"roast":"Twinkle twinkle little slut, You like dick inside your butt"},
	{"roast":"The last time I saw a face like yours I fed it a banana"}
];
client.on("ready", () => {
	console.log("Roast-Bot is Ready");
	console.log("Number of servers Roast-Bot is in: " + client.guilds.size);
    client.user.setActivity("r!help", { type: "PLAYING" })	   
});
client.on("guildMemberAdd", member => {
	let welcomeleavechannel = member.guild.channels.find("name", "welcome-leave-log");
	if (!welcomeleavechannel) return;
	let join_time = new Date();
	let join_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has joined the server.")
	.setColor("#EB671D")
	.addField("Time:", join_time)
	.addField("Tag:", member)
	.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(join_embed);
	console.log(`${member.user.username} has joined the ${member.guild} Discord.`);
});
client.on("guildMemberRemove", member => {
	let welcomeleavechannel = member.guild.channels.find("name", "welcome-leave-log");
	let leave_time = new Date();
	if (!welcomeleavechannel) return;
	let leave_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has left the server, later aligator.")
	.setColor("#EB671D")
	.addField("Time:", leave_time)
	.addField("Tag:", member)
	.setThumbnail(member.user.displayAvatarURL);
	welcomeleavechannel.send(leave_embed);
	console.log(`${member.user.username} has left the ${member.guild} Discord.`);
});
client.on("guildCreate", guild => {
    console.log("Roast Bot joined a new server named: " + guild.name);
});
client.on("guildDelete", guild => {
    console.log("Roast-Bot left a server named: " + guild.name);
})
client.on("message", message => {
	
	//Database
	if(message.author.bot) return;
	if(message.content.startsWith("r!")) {
		const key = `${message.guild.id}-${message.author.id}`;
		if(!client.points.has(key)) {
		  client.points.set(key, {
			user: message.author.id, guild: message.guild.id, points: 0, level: 1
		  });
		}
		let currentPoints = client.points.get(key, "points");
		client.points.set(key, ++currentPoints, "points");
		let curLevel = client.points.get(key, "level");
		if(currentPoints == 10) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 2: Roast-Noob! <:roast_circle:474755210485563404>");
		}else if(currentPoints == 15 ) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 3: Roast-Learner! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 25) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 4: Mediocre Roaster! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 50) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 5: Advanced Roaster! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 100) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 6: Roast-Master! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 200) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 7: Roast-Jesus! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 500) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 8: Roast-God! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 1000) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now level 9: Roast-Champion! <:roast_circle:474755210485563404>");
		} else if(currentPoints == 10000) {
			client.points.set(key, ++curLevel, "level");
			return message.reply("Level up, your now max level, level 10. Join the support server to get to submit and custom roast to be added to Roast-Bot. Invite Link: https://discord.gg/NvVX6VD! <:roast_circle:474755210485563404>");
		}
		client.points.set(key, curLevel, "level");
	}
	if (message.content === "r!level") {
		const key = `${message.guild.id}-${message.author.id}`;
		let currentPoints = client.points.get(key, "points");
		client.points.set(key, --currentPoints, "points");
		return message.reply(` You currently have ${client.points.get(key, "points")} XP, and are level ${client.points.get(key, "level")}! <:roast_circle:474755210485563404>`);
	}
    if(message.content === "r!help") {
		let help_icon = client.user.displayAvatarURL;
		let help_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Roast-Bot Commands:")
		.addBlankField()
		.setThumbnail(help_icon)
		.addField("r!help", "List of Roast-Bot Commands.")
		.addField("r!bot", "Learn more about Roast-Bot.")
		.addField("r!roast @USER, r!roast, or r!roast #NUMBER_OF_ROAST", "Generate a random roast with the number of roast it was.")
		.addField("r!invite", "Link to invite Roast-Bot to a server")
		.addField("r!server", "Info about your server.")
		.addField("r!meme, or r!meme #NUMBER_OF_MEME", "Sends a meme to the current channel.")
		.addField("r!clear NUMBER", "Choose how many messages you want to delete. Max is 100. **To use this command Roast-Bot needs to given Manage Messages permissions.**")
		.addField("welcome-leave-log", "To use the Roast-Bot welcome-leave-log make a channel named \"welcome-leave-log\". If you dont want to use the log dont make a channel named welcome-leave-log.")
		.addField("XP-System", "Everytime you use a Roast-Bot command your XP increases! Use r!level to check your level and XP! **r!level is in BETA** Level 1: 0-9XP, Level 2: 10XP, Level 3: 15XP, Level 4: 25XP Level 5: 50XP, Level 6: 100XP, Level 7: 200XP, Level 8: 500XP, Level 9: 1,000XP, Level 10: 10,000XP")
		.addBlankField()
		.addField("Roast-Bot Development Server:", "If you still need help, have any questions or feedback join the Roast-Bot help server. \n \n https://discord.gg/fuDF42D")
		.setFooter("v1.7.4, for release notes join the Roast-Bot help server. ");
		return message.channel.send(help_embed);
	} else if(message.content === "r!bot"){
        let bot_icon = client.user.displayAvatarURL;
        let bot_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
		.setTitle("<:roast_circle:474755210485563404> Bot Information:")
		.addBlankField()
	    .setThumbnail(bot_icon)
		.addField("Bot Name:", client.user.username)
		.addField("Created On:", client.user.createdAt)
		.setFooter("Created By Ole113#2421");
		return message.channel.send(bot_embed);
	} else if(message.content === "r!roast"){
        const random_roasts = Math.ceil(Math.random() * 54);
		return message.channel.send(roasts[random_roasts - 1].roast + `\n **Roast #${random_roasts}** <:roast_circle:474755210485563404>`);
    } else if(message.content.startsWith("r!roast ")){
		if(message.content.startsWith("r!roast #")){
			let word1 = message.content;
			let number1 = word1.slice(9, word1.length);
			let number_int = parseInt(number1);
			return message.channel.send(roasts[number_int - 1].roast + `\n **Roast #${number_int}** <:roast_circle:474755210485563404>`)
		}
		const random = Math.ceil(Math.random() * 54);
		const word = message.content;
		const reply = word.slice(8, word.length);
		return message.channel.send(reply + ", " + roasts[random - 1].roast + `\n **Roast #${random}** <:roast_circle:474755210485563404>`);
	} else if(message.content === "r!invite") {
    	message.channel.send("Invite Link: https://discordapp.com/oauth2/authorize?client_id=461361233644355595&scope=bot&permissions=8 <:roast_circle:474755210485563404>");
    } else if(message.content === "r!server"){
		let server_icon = message.guild.iconURL;
		let server_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Server Information:")
		.addBlankField()
		.setThumbnail(server_icon)
		.addField("Server Name:", message.guild.name)
		.addField("Created On:", message.guild.createdAt)
		.addField("You Joined:", message.member.joinedAt)
		.addField("Total Members:", message.guild.memberCount);
		return message.channel.send(server_embed);
	} else if(message.content.startsWith("r!meme")) {
		const random_memes = Math.ceil(Math.random() * 107);
		if(message.content.startsWith("r!meme #")){
			let word2 = message.content;
			let number2 = word2.slice(8, word2.length);
			let number_int1 = parseInt(number2);
			return message.channel.send(`Meme #${number_int1} <:roast_circle:474755210485563404>`, {files: [`Images/meme${number_int1}.PNG`]})
		} else{ return message.channel.send(`Meme #${random_memes} <:roast_circle:474755210485563404>`, {files: [`Images/meme${random_memes}.PNG`]})};	
	} else if(message.content.startsWith("r!clear")){
		const word = message.content;
		const number = word.slice(7, word.length);
		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
			return message.channel.send("Roast-Bot needs to be given Manage Messages permissions to use this command :( <:roast_circle:474755210485563404>");
		} else if(number > 100){
			return message.channel.send("The max number of messages you can delete is 100 :( <:roast_circle:474755210485563404>");
		} else if(!message.member.hasPermission("MANAGE_MESSAGES")){
			return message.channel.send("Looks like you dont have the permissions to do that :( <:roast_circle:474755210485563404>");
		} else if(number == ""){
			return message.channel.send("Incorrect usage of r!clear, please provide how many messages you want to be deleted. The correct usage is r!clear NUMBER. <:roast_circle:474755210485563404>");
		}
		message.channel.bulkDelete(number + 1).then(() => {
			return message.channel.send(`Cleared ${number} messages. <:roast_circle:474755210485563404>`)
		});
	}
});
//message.reply
client.login(process.env.BOT_TOKEN);