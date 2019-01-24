CREATE TABLE roast_bot_feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username  TEXT NOT NULL,
    userID    TEXT NOT NULL,
    feedback  TEXT NOT NULL,   
);



           /*
			if (Number(userXP) === 10) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 2: Roast-Noob! <:roast_circle:474755210485563404>.\n\n10/15 XP for level 3.");
			} else if (Number(userXP) === 15) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 3: Roast-Learner! <:roast_circle:474755210485563404>.\n\n15/25 XP for level 4.");
			} else if (Number(userXP) === 25) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 4: Mediocre Roaster! <:roast_circle:474755210485563404>\n\n25/50 XP for level 5.");
			} else if (Number(userXP) === 50) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 5: Advanced Roaster! <:roast_circle:474755210485563404>\n\n50/100 XP for level 6.");
			} else if (Number(userXP) === 100) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 6: Roast-Master! <:roast_circle:474755210485563404>\n\n100/200 XP for level 7.");
			} else if (Number(userXP) === 200) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 7: Roast-Jesus! <:roast_circle:474755210485563404>\n\n200/500 XP for level 8.");
			} else if (Number(userXP) === 500) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 8: Roast-God! <:roast_circle:474755210485563404>\n\n500/1000 XP for level 9.");
			} else if (Number(userXP) === 1000) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now level 9: Roast-Champion! <:roast_circle:474755210485563404>\n\n1000/5000 XP for level 10.");
			} else if (Number(userXP) === 5000) {
				updateLevelSQL = `INSERT INTO roast_bot_xp (username, userID, userXP, userLevel) VALUES ("", "", "", userLevel + 1)`;
				return message.reply("Level up, your now max level, level 10. Congrats!");
            }
            */