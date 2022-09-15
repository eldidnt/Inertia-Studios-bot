const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "8ball",
    aliases: ["prediccion", "futuro"],
    run: async (client, message, args, prefix) => {
        let pregunta = args.join(" ");
        if(!pregunta) return message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle('Error')
            .setDescription('**Uso correcto:** `' + `${prefix}8ball (pregunta)` +'`\nIngresa una pregunta valida para responder')
            .setColor(client.config.errorColor)
            ]});
        let respuestas = [
            "Si",
            "Por supuesto",
            "No hay duda",
            "Para nada",
            "No",
            "Por qué me preguntas eso",
            "No tengo idea",
            "No me preguntes",
            "Tú sabrás",
            "Tu mamá por si acaso",
            "Ya pero ,¿Edateamos?"
        ];
        let respuesta = respuestas[Math.floor(Math.random() * respuestas.length)];
        const embed_respuesta = new EmbedBuilder()
            .setTitle("**8ball**")
            .addFields(
                [{
                    name:"Pregunta:",
                    value: pregunta,
                },
                {
                    name: "Respuesta:",   
                    value: respuesta,
                }])
            .setFooter({
                text:`${message.guild.name}`,
                iconURL: message.author.displayAvatarURL()
            })
            .setThumbnail('https://i.imgur.com/BemqoA5.png')
            .setColor(client.config.color);
        await message.reply({ embeds: [embed_respuesta]});
        
    },
};