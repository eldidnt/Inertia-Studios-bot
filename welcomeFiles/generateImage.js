const Canvas = require("canvas");
const Discord = require("discord.js");
const { AttachmentBuilder } = require("discord.js");

const dimensionsBackground= {
    width: 1280,
    height: 720,
    margin: 25
};

const avatar = {
    size: 256,
    x: 272,
    y: 80
};

Canvas.registerFont('welcomeFiles/theboldfont.ttf', { family: "Bold" });

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');
    // Declare un tamaño base de la fuente
    let fontSize = 60;
    do {
    // Asignar la fuente al contexto y disminuirla para que se pueda medir nuevamente
    ctx.font = `${fontSize -= 1}px Bold`
        // Compare el ancho de píxel del texto con el lienzo menos el tamaño aproximado del avatar
    } while (ctx.measureText(text).width > canvas.width - 700);
        // Devuelve el resultado para usarlo en el lienzo real
    return ctx.font;
};

const generateImage = async (member) =>{
    
    const canvas = Canvas.createCanvas(dimensionsBackground.width, dimensionsBackground.height);
    const context = canvas.getContext("2d");
   
    //background
    
    const backgroungImage = await Canvas.loadImage("welcomeFiles/background.png");

    context.drawImage(backgroungImage, 0, 0);
    context.fillStyle = "rgba(0, 0, 0, 0.8)";
    context.fillRect(dimensionsBackground.margin, dimensionsBackground.margin, dimensionsBackground.width - (2 * dimensionsBackground.margin), dimensionsBackground.height - (2 * dimensionsBackground.margin));
    context.save();

    //avatar
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: "false", size: 256});
    const avatarImage = await Canvas.loadImage(avatarURL);
    
    context.beginPath();
    context.arc(avatar.x + (avatar.size / 2), avatar.y + (avatar.size / 2), avatar.size / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    context.drawImage(avatarImage, avatar.x, avatar.y, avatar.size, avatar.size);
    context.restore();

    //text
    let username = member.user.username;
    let discriminator = member.user.discriminator;
    let cuenta = member.guild.memberCount;

    context.font = applyText(canvas, username);
    context.fillStyle = "black";
    context.textAlign = "right";
    context.fillText(username, dimensionsBackground.width / 2, dimensionsBackground.margin + 400);

    context.font = applyText(canvas, username);
    context.fillStyle = "white";
    context.textAlign = "right";
    context.fillText("#"+  discriminator, dimensionsBackground.width / 2, dimensionsBackground.margin + 400);
    
    context.font = applyText(canvas, username);
    context.fillStyle = "white";
    context.textAlign = "right";
    context.fillText("Miembros del servidor: " + cuenta, dimensionsBackground.width / 2, dimensionsBackground.margin + 400);
    const attachment = new AttachmentBuilder(canvas.toBuffer('image/png'), { name: 'image.png' });
    return attachment;
};

module.exports = generateImage;