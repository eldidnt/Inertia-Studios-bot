const { AttachmentBuilder } = require('discord.js');
const { createCanvas, Image } = require('@napi-rs/canvas');
const { readFile } = require('fs/promises');
const { request } = require('undici');

module.exports = {
    name: 'testImage',
    alias: ['image'],

run: async (client, message, args, prefix) => {
    if(!message.member.permissions.has('Administrator')) return;
    const applyText = (canvas, text) => {
        const context = canvas.getContext('2d');
        let fontSize = 70;
    
        do {
            context.font = `${fontSize -= 10}px sans-serif`;
        } while (context.measureText(text).width > canvas.width - 300);
    
        return context.font;
    };

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
    context.fillText(message.author.username, 915, 330);

    context.font = '70px sans-serif';
    context.fillStyle = '#3E3E3E';
    context.fillText("#" + message.author.discriminator, 1050, 410);

    context.font = '55px sans-serif';
    context.fillStyle = '#3E3E3E';
    context.fillText("Eres el miembro: 23123 ", 900, 560);

    context.beginPath();
    context.arc(300, 360, 250, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const { body } = await request(message.author.displayAvatarURL({ format: 'jpg', size: 512}));
    const avatar = new Image();
    avatar.src = Buffer.from(await body.arrayBuffer());
    context.drawImage(avatar, 50, 110, 500, 500);

    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'profile-image.png' });

    message.reply({ files: [attachment] });
    }
}