module.exports = {
  name: "delete",
  description: "delete a ticket",

  execute(message, args) {
    const Discord = require("discord.js");

    const { serversupportparent } = require("../config.json");
    const { serversupportparent2 } = require("../config.json");

    if (
      message.channel.parent.id === serversupportparent ||
      message.channel.parent.id === serversupportparent2
    ) {
      message.channel.delete();
    }
  },
};
