const { EmbedBuilder } = require('discord.js')
const ms = require("ms")
module.exports = {
    name: "gstart",
    aliases: ["iniciarsorteo", "giveawaystart"],
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        if(!args || args.length < 3) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}gstart (duracion) (cantidad) (premio)`)
            .setColor(client.config.errorColor)
            ]
        }).then(async m => { setTimeout(() => { m.delete() }, 5000) });
        
        client.giveawaysManager
        .start(message.channel, {
            duration: ms(args[0]),
            winnerCount: parseInt(args[1]),
            prize: args.slice(2).join(" "),
            messages: {
                giveaway: '🎉🎉 **SORTEO** 🎉🎉',
                giveawayEnded: '🎉🎉 **SORTEO TERMINADO** 🎉🎉',
                title: '{this.prize}',
                drawing: 'Terminando en: {timestamp}',
                dropMessage: 'Se el primero en reaccionar con 🎉 !',
                inviteToParticipate: '¡Reacciona con 🎉 para participar!',
                winMessage: 'Felicidades {winners}! Has**{this.prize}**!',
                embedFooter: '{this.winnerCount} winner(s)',
                noWinner: 'Giveaway cancelled, no valid participations.',
                hostedBy: 'Hosted by: {this.hostedBy}',
                winners: 'Winner(s):',
                endedAt: 'Ended at'
            }
        })
        .catch((err) => {
            message.reply({ embeds: [new EmbedBuilder()
                .setTitle('Error')
                .setDescription('**Uso correcto:** `' + `${prefix}gstart (duracion) (cantidad) (premio)`)
                .setColor(client.config.errorColor)
                ]
            }).then(async m => { setTimeout(() => { m.delete() }, 5000) });
            
        });
    }
}