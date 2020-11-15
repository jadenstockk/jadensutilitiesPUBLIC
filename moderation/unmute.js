module.exports = {
  name: "unmute",
  description: "unmute a user",

  execute(message, args) {
    const Discord = require("discord.js");

    let muteTarget =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!muteTarget) return;

    if (muteTarget.user.bot) return;

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
      if (!muteTarget.hasPermission("ADMINISTRATOR")) {
        let muteRole = message.guild.roles.cache.find(
          (role) => role.name === "Muted"
        );

        if (muteTarget.roles.cache.some((role) => role.name === "Muted")) {
          message.delete();

          let muteMod = message.author.tag;

          let mutedMessageChannelSend = new Discord.MessageEmbed()
            .setColor("33FF5B")
            .setAuthor(
              `${muteTarget.user.tag} has been unmuted`,
              muteTarget.user.displayAvatarURL()
            );

          message.channel.send(mutedMessageChannelSend);

          muteTarget.roles.remove(muteRole);

          serverLog(muteTarget.user, "UNMUTED", message.author, "", "");
        } else {
          let alreadyNotMuted = new Discord.MessageEmbed()
            .setDescription(
              `**❌ You cannot unmute someone that is not muted**`
            )
            .setColor("FF3E3E");

          message.channel.send(alreadyNotMuted);

          return;
        }
      } else {
        message.channel.send(`**❌ You aren't allowed to unmute people.**`);
      }
    }
  },
};
