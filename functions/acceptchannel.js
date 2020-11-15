module.exports = {
  name: "acceptchannel",
  description: "server delete messages in channel",

  execute(message, args) {
    let acceptChannel = message.guild.channels.cache.find(
      (x) => x.name === "✅・verify"
    );
    let adminRole = message.guild.roles.cache.find(
      (role) => role.name === "🔑 Admin"
    );

    if (message.author.bot) return;

    if (message.member.roles.cache.has(adminRole)) return;

    if (message.channel === acceptChannel) message.delete();
  },
};
