CREATE TABLE roast_bot_censor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT NOT NULL,
    guildID   TEXT NOT NULL,
    onOff    BOOLEAN
);