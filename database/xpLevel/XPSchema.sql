CREATE TABLE roast_bot_xp (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username  TEXT   NOT NULL,
    userID    TEXT   NOT NULL,
    guildID   TEXT   NOT NULL,
    userXP    BIGINT NOT NULL,
    userLevel BIGINT NOT NULL
);