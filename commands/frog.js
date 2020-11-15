module.exports = {
  name: "frog",
  description: "request a random frog pic!",

  execute(message, args) {
    const Discord = require("discord.js");

    let imageNumber = Math.floor(Math.random() * 10) + 1;
    message.channel.send({ files: ["./frogimages/" + imageNumber + ".jpg"] });
  },
};
