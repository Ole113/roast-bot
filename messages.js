const db = require('quick.db');

exports.run = (bot, message, args, func) => {

    db.fetchObject(message.author.id + message.guild.id).then(i => {
        db.fetch(`userLevel_${message.author.id + message.guild.id}`).then(o => { 
            message.channel.send('Messages sent: `' + (i.value + 1) + '`\nLevel: `' + o.value + '`'); 
        })
    })

}