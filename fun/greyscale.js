module.exports = {
  name: "greyscale",
  description: "greyscale someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.greyscale(avatar);
    let attachment = new Discord.MessageAttachment(image, "greyscale.png");
    return message.channel.send(attachment);
  },
};
