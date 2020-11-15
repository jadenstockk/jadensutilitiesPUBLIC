module.exports = {
  name: "accept",
  description: "accept the server rules",

  execute(message, args) {
    const Discord = require("discord.js");

    let acceptChannel = message.guild.channels.cache.find(
      (x) => x.name === "✅・verify"
    );

    if (message.channel.type === "dm") return;

    if (message.channel === acceptChannel) {
      let unverifiedRole = message.guild.roles.cache.find(
        (role) => role.name === "❌ Unverified"
      );

      let acceptEmbed = new Discord.MessageEmbed()
        .setDescription(`✅ **You are now verified in Jaden's Empire!** ✅`)
        .setFooter(
          `Jaden's Empire Rules`,
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
        .setColor("#059DFF");

      message.author.send(acceptEmbed);

      message.member.roles.remove(unverifiedRole);
    }
  },
};
