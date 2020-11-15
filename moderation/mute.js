module.exports = {
  name: "mute",
  description: "mute a user",

  execute(message, args, client) {
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
          let alreadyMuted = new Discord.MessageEmbed()
            .setDescription(
              `**❌ You cannot mute someone that is already muted**`
            )
            .setColor("FF3E3E");

          message.channel.send(alreadyMuted);

          return;
        }

        let muteTime = args[1];

        if (!muteTime) muteTime = "∞";

        let muteReason = args.slice(2).join(" ");

        if (isNaN(muteTime))
          (muteReason = args.slice(1).join(" ")), (muteTime = "∞");

        if (!muteReason) muteReason = "Unspecified";

        if (muteTime > 86400)
          return message.channel.send(
            `**❌ Duration can't be longer than 1 day.**`
          );

        message.delete();

        let muteMod = message.author.tag;

        let muteDurationOptionalAMOUNT = muteTime;
        let muteDurationOptional = "";
        let muteDurationOptionalTYPE = "seconds";

        if (!isNaN(muteTime) && muteTime > 59)
          (muteDurationOptionalAMOUNT = muteTime / 60),
            (muteDurationOptionalTYPE = "minutes");
        if (!isNaN(muteTime) && muteTime > 3599)
          (muteDurationOptionalAMOUNT = muteTime / 3600),
            (muteDurationOptionalTYPE = "hours");
        if (!isNaN(muteTime) && muteTime > 86399)
          (muteDurationOptionalAMOUNT = muteTime / 86400),
            (muteDurationOptionalTYPE = "day");

        if (!isNaN(muteTime))
          muteDurationOptional = `for ${Math.round(
            muteDurationOptionalAMOUNT
          )} ${muteDurationOptionalTYPE}`;

        let mutedMessageChannelSend = new Discord.MessageEmbed()
          .setColor("FF3E3E")
          .setAuthor(
            `${muteTarget.user.tag} has been muted ${muteDurationOptional}`,
            muteTarget.user.displayAvatarURL()
          )
          .setDescription(`**Reason:** ${muteReason}`);

        message.channel.send(mutedMessageChannelSend);

        muteTarget.roles.add(muteRole);

        function unMute() {
          setTimeout(function () {
            if (muteTarget.roles.cache.some((role) => role.name === "Muted")) {
              muteTarget.roles.remove(
                message.guild.roles.cache.find((r) => r.name === "Muted")
              );
              serverLog(muteTarget.user, "UNMUTED", client.user, "", "");
            }
          }, muteTime * 1000);
        }

        let finalMuteTime = "∞";
        if (!isNaN(muteTime))
          finalMuteTime = `${Math.round(
            muteDurationOptionalAMOUNT
          )} ${muteDurationOptionalTYPE}`;

        if (isNaN(muteTime)) {
        } else {
          unMute();
        }

        serverLog(
          muteTarget.user,
          "MUTED",
          message.author,
          muteReason,
          finalMuteTime
        );
      } else {
        message.channel.send(`**❌ You aren't allowed to mute people.**`);
      }
    }
  },
};
