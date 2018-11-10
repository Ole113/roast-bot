/*
*
*    Things to add to r!censor:
*  ------------------------------
*
*
*/
const Discord = require("discord.js");

const prefixFile = require("../Database/prefix.json");
const onOffFile = require("../Database/on-off.json");
const { roastFile } = require("../Commands/roast.js");

exports.run = async (message) => {
    if (message.author.bot) { return; }
    if (message.content.toLowerCase().startsWith(prefixFile.prefix + "censor") && onOffFile.censor == "on") {

        roastFile[43].roast = "I failed a spelling test because they asked me how to spell 'b*tch' and I wrote down your name.";
        roastFile[92].roast = "You must\'ve been born at a pound because your a son of a b*tch.";
        roastFile[92].roast = "What did you have for breakfast? B*tch Flakes?";
        roastFile[132].roast = "If I wanted a b*tch I'd have bought a dog.";
        roastFile[40].roast = "Roses are red, sh*t is brown, shut the f**k up, and sit the f**k down.";
        roastFile[44].roast = "Twinkle Twinkle little sl*t, name a guy you haven't f**ked, was he skinny, was he tall, Nevermind you did them all.";
        roastFile[47].roast = "I don't see any d*cks in the general vicinity... So I'm wondering why you keep opening your f**king mouth.";
        roastFile[72].roast = "Anyone willing to f**k you is just too lazy to masturbate.";
        roastFile[112].roast = "Good story, but in what chapter do you shut the f**k up?";
        roastFile[114].roast = "I\'d tell you to go f**k yourself, but that would be cruel and unusual punishment.";
        roastFile[57].roast = "Is your butt jealous of the amount of sh*t that just came out of your mouth?";
        roastFile[70].roast = "Your face could scare the sh*t out of a toilet.";
        roastFile[37].roast = "You should wear a condom on your head because if you're gonna act like a d*ck you might as well dress like one!";
        roastFile[43].roast = "I guess those penis enlargement pills are working - you're twice the d*ck you were yesterday!";
        roastFile[49].roast = "Twinkle twinkle little slut, You like d*ck inside your butt.";
        roastFile[64].roast = "You have more d*ck in your personality than you do in your pants.";
        roastFile[70].roast = "Being a d*ck to everyone won\'t make yours any bigger.";
        roastFile[88].roast = "The only reason your partner likes your d*ck is because they were taught to enjoy the little things in life.";
        roastFile[44].roast = "";
        roastFile[44].roast = "";
        roastFile[44].roast = "";
        roastFile[44].roast = "";
        roastFile[44].roast = "";

        return message.channel.send(roastFile[43].roast);
        //return message.channel.send(`Censoring has been applied. ${roastFile[43].roast}`);
    } else if (message.content.toLowerCase().startsWith(prefixFile.prefix + "censor") && onOffFile.censor == "off") {
        return message.channel.send("This command has been turned off by an administrator.");
    }
}