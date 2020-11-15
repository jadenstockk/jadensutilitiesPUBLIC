module.exports = {
  name: "clyde",
  description: "clyde a message!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let text = args.slice(0).join(" ");

    let image = await canvacord.Canvas.clyde(text);
    let attachment = new Discord.MessageAttachment(image, "clyde.png");
    return message.channel.send(attachment);
  },
};
