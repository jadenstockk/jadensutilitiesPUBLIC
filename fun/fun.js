module.exports = {
  name: "fun",
  description: "get a list of available fun commands",

  execute(message, args) {
    const Discord = require("discord.js");

    let commandsList = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setTitle("Fun Commands List:")
      .addFields(
        { name: "!fun", value: "get a list of available fun commands" },
        {
          name: "!changemymind (phrase)",
          value: "get a list of all the rules on Jaden's Empire",
        },
        { name: "!clyde (phrase)", value: "get Clyde to say something" },
        {
          name: "!trash (user)",
          value: "delete someone from your computer's trash",
        },
        { name: "!facepalm", value: "facepalm :O" },
        { name: "!fuse (user)", value: "merge yourself with someone else" },
        {
          name: "!greyscale (user)",
          value: "make yourself or another user black and white!",
        },
        { name: "!jail (user)", value: "put someone in jail" },
        {
          name: "!kiss (user)",
          value: "show your affection to that special someone",
        },
        { name: "!rip (user)", value: "rest. in. peace." },
        { name: "!slap (user)", value: "slap someone!" },
        { name: "!trigger (user)", value: "trigger someone or yourself!" },
        { name: "!wanted (user)", value: "make someone wanted!" }
      )
      .setFooter("Requested by " + message.author.tag)
      .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");
    message.channel.send(commandsList);
  },
};
