module.exports = {
  name: "dog",
  description: "request a random cute dog pic!",

  execute(message, args) {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 30) + 1;
    message.channel.send({ files: ["./dogimages/" + imageNumber + ".jpg"] });
  },
};
