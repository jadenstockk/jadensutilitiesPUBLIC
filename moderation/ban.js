module.exports = {
  name: "ban",
  description: "ban a user",

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
      if (message.author.bot) return;

      async function banUserProcess() {
        let banUser =
          message.mentions.users.first() || (await client.users.fetch(args[0]));

        if (!banUser) return;

        let banReason = args.slice(1).join(" ");
        if (!banReason) banReason = "Unspecified";

        let banMessage = new Discord.MessageEmbed()
          .setColor("FF3E3E")
          .setAuthor(
            `${banUser.tag} has been banned`,
            banUser.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${banReason}`);

        message.guild.members.ban(banUser, { reason: banReason });

        message.channel.send(banMessage);

        serverLog(banUser, "BAN", message.author, banReason);

        message.delete();
      }
      banUserProcess();
    } else {
      message.channel.send(`❌ **You are not allowed to ban people**`);
    }
  },
};
