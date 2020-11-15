module.exports = {
  name: "cat",
  description: "request a random cute cat pic!",

  execute(message, args) {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 30) + 1;
    message.channel.send({ files: ["./catimages/" + imageNumber + ".jpg"] });
  },
};
