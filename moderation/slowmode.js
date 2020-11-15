module.exports = {
  name: "slowmode",
  description: "set slowmode for a channel",

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
      let slowmodeAmount = args[0];

      message.delete();

      if (!slowmodeAmount) return;
      if (slowmodeAmount === "off") slowmodeAmount = 0;
      if (isNaN(slowmodeAmount)) return;
      if (slowmodeAmount > 21599) slowmodeAmount = 21600;

      message.channel.setRateLimitPerUser(slowmodeAmount);
    }
  },
};
