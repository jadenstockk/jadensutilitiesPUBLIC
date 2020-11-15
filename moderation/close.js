module.exports = {
  name: "close",
  description: "close a ticket",

  execute(message, args) {
    const Discord = require("discord.js");

    const { serversupportparent } = require("../config.json");
    const { serversupportparent2 } = require("../config.json");

    if (message.channel.parent.id === serversupportparent) {
      let ticketClosed = new Discord.MessageEmbed()
        .setDescription(`🔒 Ticket closed by ${message.author} 🔒`)
        .setColor("#059DFF");

      message.channel.send(ticketClosed);
      message.channel.setParent(serversupportparent2, {
        lockPermissions: false,
      });
      message.channel.setName(`ticket-closed`);

      message.delete();
    }
  },
};
