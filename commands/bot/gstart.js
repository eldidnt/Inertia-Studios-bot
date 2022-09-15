const { EmbedBuilder } = require('discord.js')
const ms = require("ms")
module.exports = {
    name: "gstart",
    aliases: ["iniciarsorteo", "giveawaystart"],
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        if(!args || args.length < 3) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}gstart (duracion) (cantidad) (premio)` +'`\nIngresa un mensaje valido para enviar')
            .setColor(client.config.errorColor)
            ]
        }).then(async m => { setTimeout(() => { m.delete() }, 5000) });
        
        let a = args[2].join(" ")
        console.log(args[0])
        console.log(args[1])
        console.log(a)
        // client.giveawaysManager
        // .start(message.channel, {
        //     time: ms(args[0]),
        //     winnerCount: parseInt(args[1]),
        //     prize: args.slice(2).join(" ")
        // })
        // .catch((err) => {
        //     message.reply(`Un error ha ocurrido:\n\`${err}\``);
        // });
    }
}