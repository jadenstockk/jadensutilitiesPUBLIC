module.exports = {
  name: "trash",
  description: "delete someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.delete(avatar, 5);
    let attachment = new Discord.MessageAttachment(image, "delete.png");
    return message.channel.send(attachment);
  },
};
