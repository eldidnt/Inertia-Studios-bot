const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "say",
    run: async (client, message, args, prefix) => {
        if(!message.member.permissions.has('Administrator')) return;
        let msg = args.join(" ");
        await message.delete()
        if(!msg) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}say (mensaje)` +'`\nIngresa un mensaje valido para enviar')
            .setColor(client.config.errorColor)
            ]
        }).then(async m => { setTimeout(() => { m.delete() }, 3000) });
        await message.channel.send(msg);
    }
}