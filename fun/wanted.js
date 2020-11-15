module.exports = {
  name: "wanted",
  description: "wanted someone!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.wanted(avatar);
    let attachment = new Discord.MessageAttachment(image, "wanted.png");
    return message.channel.send(attachment);
  },
};
