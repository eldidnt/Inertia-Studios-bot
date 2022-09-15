
module.exports =  {
    name: "messageCreate",
    
    run: async (message, client) => {
        if(message.author.bot || !message.guild || message.channel.type === 'dm') return;

        let prefix = client.config.prefix;

        if(!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();    

        let cmd = client.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
        if(cmd) {
            cmd.run(client, message, args, prefix);
        }
    }
}
