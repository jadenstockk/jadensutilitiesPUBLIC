module.exports = {
  name: "unban",
  description: "unban a user",

  execute(message, args) {
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
      if (message.author.bot) return;

      let banReason = args.slice(1).join(" ");
      if (!banReason) banReason = "Unspecified";

      let banUser = args[0];
      message.guild.fetchBans().then((bans) => {
        if (bans.size == 0) return;
        let bUser = bans.find((b) => b.user.id == banUser);
        if (!bUser) return;
        message.guild.members.unban(bUser.user);

        let unbannedMessage = new Discord.MessageEmbed()
          .setColor("33FF5B")
          .setAuthor(
            `${bUser.user.tag} has been unbanned`,
            bUser.user.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${banReason}`);

        message.channel.send(unbannedMessage);

        serverLog(bUser.user, "UNBAN", message.author, banReason);
        message.delete();
      });
    } else {
      message.channel.send(`❌ **You are not allowed to unban people**`);
    }
  },
};
