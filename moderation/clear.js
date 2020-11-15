module.exports = {
  name: "clear",
  description: "clear messages in a channel",

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
      let clearAmount = args[0];

      message.delete();

      if (!clearAmount) return;
      if (isNaN(clearAmount)) return;
      if (clearAmount < 0) return;
      if (clearAmount > 999) return;

      message.channel
        .bulkDelete(clearAmount)
    }
  },
};
