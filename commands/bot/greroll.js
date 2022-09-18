const { EmbedBuilder } = require('discord.js')
const ms = require("ms")
module.exports = {
    name: "greroll",
    aliases: ["resortear", "giveawayreroll"],
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        let messageId = args[0];
        if(!args || !messageId) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}greroll (id sorteo)`)
            .setColor(client.config.errorColor)
            ]
        }).then(async m => { setTimeout(() => { m.delete() }, 5000) });

        client.giveawaysManager.reroll(messageId, {
            messages: {
                congrat: ':tada: Nuevo(s) ganador(es): {winners}! Felicitaciones, has ganado **{this.prize}**',
                error: 'No hay mas participaciones validas, no se pudo sortear un nuevo ganador.'
            }
        }).then(() => {})
        .catch((err) => {
            message.reply({ embeds: [new EmbedBuilder()
                .setTitle('Error')
                .setDescription('**Uso correcto:** `' + `${prefix}greroll (id sorteo)`)
                .setColor(client.config.errorColor)
                ]
            }).then(async m => { setTimeout(() => { m.delete() }, 5000) });
        });
    }
}