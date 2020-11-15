const { greyscale } = require("canvacord/src/Canvacord");

module.exports = {
  name: "jail",
  description: "jail someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.jail(avatar, greyscale);
    let attachment = new Discord.MessageAttachment(image, "jail.png");
    return message.channel.send(attachment);
  },
};
