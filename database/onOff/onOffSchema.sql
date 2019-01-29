CREATE TABLE roast_bot_on_off (
    id INT PRIMARY KEY AUTO_INCREMENT,
    guildID  TEXT NOT NULL,
    username TEXT NOT NULL,
    _clear   BOOLEAN,
    bot      BOOLEAN,
    meme     BOOLEAN,
    roast    BOOLEAN,
    say      BOOLEAN,
    _server  BOOLEAN,
    urban    BOOLEAN,
    user     BOOLEAN,
    vid      BOOLEAN
);