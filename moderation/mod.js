module.exports = {
  name: "mod",
  description: "get a list of the moderation commands",

  execute(message, args, client) {
    const Discord = require("discord.js");

    if (
      message.member.roles.cache.some((role) => role.name === "🔑 Admin") ||
      message.member.roles.cache.some(
        (role) => role.name === "🔒 Moderators"
      ) ||
      message.member.roles.cache.some(
        (role) => role.name === "🔒 Senior Moderators"
      ) ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      let commandsList = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle("Moderation Command List:")
        .setDescription("***< >** means compulsory and **( )** means optional*")
        .addFields(
          {
            name: "!mod",
            value: "get a list of available moderation commands",
          },
          {
            name: "!warn <user> (reason)",
            value:
              "warn a user (2 warns within 30 minutes results in a 2 minute mute)",
          },
          {
            name: "!infractions (user)",
            value: "get a list of a user's infractions",
          },
          { name: "!mute <user> (time) (reason)", value: "mute a user" },
          { name: "!unmute <user>", value: "unmute a user" },
          {
            name: "!clear <number of messages>",
            value: "delete a certain amount of messages",
          },
          {
            name: "!kick <user> (reason)",
            value: "get Covid-19 stats of a country or the world",
          },
          {
            name: "!ban <user> (reason)",
            value: "see what fun commands are available for you to use!",
          },
          {
            name: "!unban <user> (reason)",
            value: "request a random cute cat pic!",
          },
          {
            name: "!slowmode <time in seconds>",
            value: "request a random cute dog pic!",
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "SUPPORT TICKET COMMANDS:",
            value:
              "!close - close a ticket that is open \n !delete - delete a ticket that is open or closed",
          }
        )
        .setFooter(
          "Jaden's Empire Moderation",
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
        .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
      message.channel.send(commandsList);
    }
  },
};
