const { GatewayIntentBits, Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways');
require('colors');
const client = new Client({
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildMembers,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});
const config = require(`${process.cwd()}/config`);
const fs = require('fs');

const giveaways = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});

client.giveawaysManager = giveaways;
client.login(config.token)
client.config = config;

//command handler
client.commands = new Collection();
fs.readdirSync('./commands').forEach((dir) => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
    for (let file of commands) {
        let command = require(`./commands/${dir}/${file}`);
        console.log(`Command Loaded - ${file} prefix command`.yellow)
        client.commands.set(command.name, command);
    }
});

//event handler
client.events = new Collection();
fs.readdirSync('./events').forEach((dir) => {
    const events = fs.readdirSync(`${process.cwd()}/events/${dir}/`).filter((file) => file.endsWith('.js'));
    for(let file of events) {
        
        let event = require (`./events/${dir}/${file}`);

        if (event.name) {
            console.log(`Event Loaded - ${file} event`.yellow);
            client.on(event.name, (...args) => event.run(...args, client));
        } else {
            console.log(`Event Loaded - Error in ${file} event, ${file}.name not found`.red)
        }
    }
})