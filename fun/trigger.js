const canvacord = require("canvacord");

module.exports = {
  name: "trigger",
  description: "trigger someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.trigger(avatar);
    let attachment = new Discord.MessageAttachment(image, "triggered.gif");
    return message.channel.send(attachment);
  },
};
