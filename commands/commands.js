module.exports = {
  name: "commands",
  description: "get a list of available commands",

  execute(message, args) {
    const Discord = require("discord.js");

    let commandsList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setTitle("Jaden's Ultilites Command List:")
      .addFields(
        { name: "!commands", value: "get a list of available commands" },
        { name: "!rules", value: "get a list of all the rules on Jaden's Empire" },
        { name: "!roles", value: "get a list of all the roles of Jaden's Empire and what they do", },
        { name: "!report (user) (reason)", value: "report a user" },
        { name: "!fun", value: "see what fun commands are available for you to use!" },
        { name: "!economy", value: "see what economy commands are available for you to use! " },
        { name: "!familycommands", value: "see what family commands are available for you to use!" },
        { name: "!infractions", value: "get a list of your infractions" },
        { name: "!namecolour (colour)", value: "change your name colour" },
        { name: "!urban", value: "get a definition of a word" },
        { name: "!covid (country)", value: "get Covid-19 stats of a country or the world" },
        { name: "!cat", value: "request a random cute cat pic!" },
        { name: "!dog", value: "request a random cute dog pic!" },
        { name: "!frog", value: "request a random frog pic!" }
      )
      .setFooter("Requested by " + message.author.tag)
      .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
    message.channel.send(commandsList);
  },
};
