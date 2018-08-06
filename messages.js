const db = require('quick.db');

exports.run = (bot, message, args, func) => {

    db.fetch(message.author.id + message.guild.id).then(i => {
        db.fetch(`userLevel_${message.author.id + message.guild.id}`).then(o => { 
            return message.channel.send('Messages sent: `' + (i.value + 1) + '`\nLevel: `' + o.value + '`'); 
        })
    })

}