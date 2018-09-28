

exports.run = async (message) => {
    if(message.content.toLowerCase().startsWith("r!prefix ")) {
        
			let content = message.content;
            let custom_prefix = content.slice(9, content.length);
            
            return message.channel.send(custom_prefix);

    }
}