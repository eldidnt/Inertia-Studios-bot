const { AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');
const { channels } = require("../../config");

module.exports =  {
    name: "guildMemberAdd",
    run: async (member, client) => {
        console.log(`${member.user.username}#${member.user.discriminator}(${member.user.id}) ha entrado al servidor`);

        //image

        const canvas = createCanvas(1280, 720);
        const context = canvas.getContext('2d');

        const background = await readFile(`${process.cwd()}/welcomeFiles/background.jpg`);
        const backgroundImage = new Image();
        backgroundImage.src = background;
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = `70px sans-serif`;
        context.fillStyle = '#3E3E3E';
        context.textAlign = 'center';
        context.fillText(member.user.username, 915, 330);

        context.font = '70px sans-serif';
        context.fillStyle = '#3E3E3E';
        context.fillText("#" + member.user.discriminator, 1050, 410);

        context.font = '55px sans-serif';
        context.fillStyle = '#3E3E3E';
        context.fillText("Eres el miembro: " + member.guild.memberCount, 900, 560);

        context.beginPath();
        context.arc(300, 360, 250, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();

        const { body } = await request(member.user.displayAvatarURL({ format: 'jpg', size: 512}));
        const avatar = new Image();
        avatar.src = Buffer.from(await body.arrayBuffer());
        context.drawImage(avatar, 50, 110, 500, 500);

        const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

        member.guild.channels.cache.get(channels.welcome).send({
            embeds: [ new EmbedBuilder()
                .setTitle('Bienvenido a ' + member.guild.name)
                .setDescription('\nNo olvides pasarte por <#'+ channels.rules +'>\nEspero que te diviertas en el servidor')
                .setColor(client.config.color)
                .setFooter({
                    text:member.user.id,
                    iconURL: member.user.displayAvatarURL()
                })
                .setTimestamp()
                .setImage('attachment://profile-image.png'),
            ],
            files: [attachment]
        });
    }
}
