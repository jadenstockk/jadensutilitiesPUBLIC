module.exports = {
    name: "familycommands",
    description: "get a list of available family commands",
  
    execute(message, args) {
      const Discord = require("discord.js");
  
      let commandsList = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle("Family Commands List:")
        .addFields(
          { name: "!familycommands", value: "get a list of available family commands" },
          {
            name: "!family (user)",
            value: "view a user's or your own family",
          },
          {
            name: "!propose (user)",
            value: "get down on one knee and ask the special question",
          },
          {
            name: "!adopt (user)",
            value: "add a child to your collection!",
          },
          { name: "!disown (user)", value: "remove a child from your collection!" },
          { name: "!daily", value: "get a daily amount of money" },
          {
            name: "!divorce",
            value: "say bye bye to your loving partner",
          },
          { name: "!wedding (date) (time) (timezone)", value: "organize a wedding for you and your partner" },
        )
        .setFooter("Requested by " + message.author.tag)
        .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
      message.channel.send(commandsList);
    },
  };