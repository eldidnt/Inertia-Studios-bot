const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'ping',
    alias: ['latencia'],

run (client, message) {
        const embed = new EmbedBuilder()
            .setTitle('🏓 ¡PONG! 🏓')
            .setDescription(`✅ ¡El ping del bot es de \`${client.ws.ping}ms\`!`)
            .setColor(client.config.color)
        message.channel.send({embeds: [embed]})
    }
}