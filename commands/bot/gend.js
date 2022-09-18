const { EmbedBuilder } = require('discord.js')
const ms = require("ms")
module.exports = {
    name: "gend",
    aliases: ["terminarsorteo", "giveawayend"],
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        let messageID = args[0];
        if(!args || !messageID) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}gend (id sorteo)`)
            .setColor(client.config.errorColor)
            ]
        }).then(async m => { setTimeout(() => { m.delete() }, 5000) });

        client.giveawaysManager.end(messageID)
        .then(() => {
        })
        .catch((err) => {
            message.reply({ embeds: [new EmbedBuilder()
                .setTitle('Error')
                .setDescription('**Uso correcto:** `' + `${prefix}gend (id sorteo)`)
                .setColor(client.config.errorColor)
                ]
            }).then(async m => { setTimeout(() => { m.delete() }, 5000) });
        });
    }
}