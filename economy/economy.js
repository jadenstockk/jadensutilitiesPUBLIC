module.exports = {
  name: "economy",
  description: "get a list of available economy commands",

  execute(message, args) {
    const Discord = require("discord.js");

    let commandsList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setTitle("Economy Commands List:")
      .addFields(
        { name: "!economy", value: "get a list of available economy commands" },
        {
          name: "!money (user)",
          value: "see how much money you or another user has",
        },
        {
          name: "!give (user) (amount)",
          value: "transfer money from your account to another user",
        },
        {
          name: "!job (user)",
          value: "see what a user's job is",
        },
        { name: "!hunt", value: "get a certain amount of money for hunting" },
        { name: "!daily", value: "get a daily amount of money" },
        {
          name: "!explore",
          value: "get a certain amount of money for exploring",
        },
        { name: "!fish", value: "get a certain amount of money for fishing" },
        { name: "!work", value: "get a certain amount of money for working" },
        {
          name: "!crime",
          value: "get a certain amount of money for commiting a crime",
        }
      )
      .setFooter("Requested by " + message.author.tag)
      .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
    message.channel.send(commandsList);
  },
};
