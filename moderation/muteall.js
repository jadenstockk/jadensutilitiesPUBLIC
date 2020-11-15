module.exports = {
  name: "muteall",
  description: "mute everyone in a voice channel",

  execute(message, args) {
    const Discord = require("discord.js");

    if (message.member.hasPermission("ADMINISTRATOR")) {
      message.delete();

      if (message.member.voice.channel) {
        let channel = message.guild.channels.cache.get(
          message.member.voice.channel.id
        );
        for (const [memberID, member] of channel.members) {
          if (!member.hasPermission("ADMINISTRATOR")) {
            member.voice.setMute(true);
          }
        }
      } else {
        message
          .reply("You need to join a voice channel first!")
          .then((m) => m.delete({ timeout: 5000 }));
        message.delete();
      }
    }
  },
};
