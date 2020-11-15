module.exports = {
  name: "changemymind",
  description: "Change my mind!",

  async execute(message, args) {
    const Discord = require("discord.js");
    const canvacord = require("canvacord");

    let text = args.slice(0).join(" ");

    let image = await canvacord.Canvas.changemymind(text);
    let attachment = new Discord.MessageAttachment(image, "changemymind.png");
    return message.channel.send(attachment);
  },
};
