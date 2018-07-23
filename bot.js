const Discord = require("discord.js");
const client = new Discord.Client();

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
    console.log("Ready");
    client.user.setActivity("r!help", { type: "PLAYING" })	   
});
client.on('guildMemberAdd', member => {
	let welcomeleavechannel = member.guild.channels.find('name', 'welcome-leave-log');
	if (!welcomeleavechannel) return;
	let join_time = new Date();
	let join_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has joined the server.")
	.setColor("#EB671D")
	.addField("Time:", join_time)
	.addField("Tag:", member);
	welcomeleavechannel.send(join_embed);
	console.log(`${member.user.username} has joined the ${member.guild} Discord.`);
  });

  client.on('guildMemberRemove', member => {
	let welcomeleavechannel = member.guild.channels.find("name", "welcome-leave-log");
	let leave_time = new Date();
	if (!welcomeleavechannel) return;
	let leave_embed = new Discord.RichEmbed()
	.setTitle(member.user.username + " has left the server, Later Aligator.")
	.setColor("#EB671D")
	.addField("Time:", leave_time)
	.addField("Tag:", member)
	welcomeleavechannel.send(leave_embed);
	console.log(`${member.user.username} has left the ${member.guild} Discord.`);
  });

client.on("message", message => {
    if(message.content === "r!help") {
		let help_icon = client.user.displayAvatarURL;
		let help_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Roast-Bot Commands:")
		.addBlankField()
		.setThumbnail(help_icon)
		.addField("r!help:", "List of Roast-Bot Commands.")
		.addField("r!bot:", "Learn more about Roast-Bot.")
		.addField("r!roast:", "Generate a random roast.")
		.addField("r!invite:", "Link to invite Roast-Bot to a server")
		.addField("r!devServer:", "Invite link to the Roast-Bot Devlopment Server.")
		.addField("r!server:", "Info about your server.")
		.addField("welcome-leave-log", "To use the Roast-Bot welcome-leave-log make a channel named \"welcome-leave-log\".");
		return message.channel.send(help_embed);
		//return message.channel.send("");
    } else if(message.content === "r!bot"){
        let bot_icon = client.user.displayAvatarURL;
        let bot_embed = new Discord.RichEmbed()
        .setColor("#EB671D")
		.setTitle("Bot Information:")
		.addBlankField()
	    .setThumbnail(bot_icon)
		.addField("Bot Name:", client.user.username)
		.addField("Created On:", client.user.createdAt)
		.setFooter("Created By Ole113");
    	return message.channel.send(bot_embed);
    } else if(message.content === "r!roast") {
  		const random = Math.ceil(Math.random() * 54);
		return message.channel.send(roasts[random - 1].roast);
    } else if(message.content === "r!invite") {
    	message.channel.send("Invite Link: https://discordbots.org/bot/461361233644355595");
    } else if(message.content === "r!devServer"){
    	message.channel.send("Link: https://discord.gg/fuDF42D.");
    } else if(message.content === "r!server"){
		let server_icon = message.guild.iconURL;
		let server_embed = new Discord.RichEmbed()
		.setColor("#EB671D")
		.setTitle("Server Information:")
		.addBlankField()
		.setThumbnail(server_icon)
		.addField("Server Name", message.guild.name)
		.addField("Created On", message.guild.createdAt)
		.addField("You Joined", message.member.joinedAt)
		.addField("Total Members", message.guild.memberCount);
		return message.channel.send(server_embed);
	}
});
//message.reply
client.login(process.env.BOT_TOKEN);
