module.exports = {
  name: "facepalm",
  description: "facepalm someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.facepalm(avatar);
    let attachment = new Discord.MessageAttachment(image, "facepalm.png");
    return message.channel.send(attachment);
  },
};
