const { Timestamp } = require("mongoose");
const mongoose = require("mongoose");
const { db } = require("../models/warns");

module.exports = {
  name: "warn",
  description: "warn a user",

  execute(message, args, client) {
    const Discord = require("discord.js");

    let warnTarget = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!warnTarget) return;

    if (warnTarget.user.bot) return;

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
      if (!warnTarget.hasPermission("ADMINISTRATOR")) {
        let warnReason = args.slice(1).join(" ");
        if (!warnReason) warnReason = "Unspecified";

        var currentDateAndTime1 = new Date().toLocaleString();
        var currentDateAndTime = currentDateAndTime1
          .slice(0, -3)
          .split("/2020,")
          .join(", ");

        let warnMod = message.author.tag;

        function warnUser(warnReason, warnTarget, warnMod, mutedStatus) {
          serverLog(warnTarget.user, "WARN", message.author, warnReason);

          let warnMessage = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setTitle("You have been warned on Jaden's Empire")
            .addFields({ name: "Reason:", value: warnReason })
            .setFooter(
              `Jaden's Empire Moderation`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )
            .setThumbnail(
              "https://images.emojiterra.com/google/android-nougat/512px/26a0.png");

            let warnMessageMuted = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setTitle("You have been warned on Jaden's Empire")
            .addFields({ name: "Reason:", value: warnReason }, { name: "Muted:", value: "You have been muted for 2 minutes" })
            .setFooter(
              `Jaden's Empire Moderation`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )
            .setThumbnail(
              "https://images.emojiterra.com/google/android-nougat/512px/26a0.png");

              if (mutedStatus) warnTarget.send(warnMessageMuted);
              if (!mutedStatus) warnTarget.send(warnMessage);

          let warnMessageChannelSend = new Discord.MessageEmbed()
            .setColor("FF3E3E")
            .setAuthor(
              `${warnTarget.user.tag} has been warned`,
              warnTarget.user.displayAvatarURL()
            )
            .setDescription(`**Reason:** ${warnReason}`);

          message.channel.send(warnMessageChannelSend);

          message.delete();

          const warns = require("../models/warns");

          warns.findOne(
            { Guild: message.guild.id, User: warnTarget.id },
            async (err, data) => {
              if (err) console.log(err);
              if (!data) {
                let newWarns = new warns({
                  User: warnTarget.id,
                  Guild: message.guild.id,
                  Warns: [
                    {
                      Reason: warnReason,
                      Time: currentDateAndTime,
                    },
                  ],
                });
                newWarns.save();
              } else {
                data.Warns.unshift({
                  Reason: warnReason,
                  Time: currentDateAndTime,
                });
                data.save();
              }
            }
          );
        }

        if (warnsNumber.has(`${warnTarget.id}_1`)) {
          let mutedStatus = true;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          let mutetime = 120000;

          serverLog(
            warnTarget.user,
            "MUTED",
            client.user,
            "Too many infractions",
            "2 Minutes"
          );

          warnTarget.roles.add(
            message.guild.roles.cache.find((r) => r.name === "Muted")
          );

          warnsNumber.delete(`${warnTarget.id}_1`);

          setTimeout(function () {
            if (warnTarget.roles.cache.some((role) => role.name === "Muted")) {
              warnTarget.roles.remove(
                message.guild.roles.cache.find((r) => r.name === "Muted")
              );
              serverLog(warnTarget.user, "UNMUTED", client.user, "", "");
            }
          }, mutetime);
        } else {
          let mutedStatus = false;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          warnsNumber.add(`${warnTarget.id}_1`);

          setTimeout(function () {
            warnsNumber.delete(`${warnTarget.id}_1`);
          }, 15 * 60000);
        }
      }
    } else {
      message.channel.send(`**❌ You aren't allowed to warn people.**`);
    }
  },
};
