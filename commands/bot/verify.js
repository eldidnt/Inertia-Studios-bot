const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
    name: "verify",
    aliases: [],
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        message.delete();
        const row = new ActionRowBuilder()
        .addComponents( 
            new ButtonBuilder() 
            .setCustomId('BotonNro1') 
            .setLabel('Verificate')
            .setStyle(ButtonStyle.Success),
        )

        const verifyEmbed = new EmbedBuilder()
            .setTitle('Verificate')
            .setDescription("Para acceder al servidor reaccione a este mensaje.")
            .setFooter(
                { text: `${client.config.embedFooterText}`
                , iconURL: `${client.user.displayAvatarURL()}`}
            );

        const msg = await message.channel.send({ embeds: [verifyEmbed], components: [row] }) 
            
        const filter = (mensajeBoton) => mensajeBoton.clicker.id === message.author.id;
        const collector = msg.createMessageComponentCollector(filter, { time: 30000 })
            
        collector.on('collect', async (x) => { 
            const rolboton1 = message.guild.roles.cache.get(client.config.roles.verified) 
            
            if(x.customId === 'BotonNro1'){ 
                await x.deferUpdate() 
                x.member.roles.add(rolboton1) 
            }            
        })
    }
}