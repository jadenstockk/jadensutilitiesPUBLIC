const Discord = require("discord.js");
const { blacklisted } = require("../blacklist.json");
const { blacklisted2 } = require("../blacklist2.json");

module.exports = {
  name: "profanityfilter",
  description: "server profanity filter",

  execute(message, args, client) {
    if (message.author.bot) return;

    let foundInText = false;
    let messageRecord = message.content;
    let messageWriter = message.author;
    let messageWriterMEMBER = message.member;
    let messageMember = message.member;
    let messageWriterID = message.author.id;
    let messageChannel = message.channel;
    let filtered = 'Unknown';

    let loggingChannel = message.guild.channels.cache.find(x => x.name === "🔒・swearing-log");
    
    function log(filtered) {
    let logEmbed = new Discord.MessageEmbed()
      .setTitle("Deleted Message")
      .setDescription(`From ${message.author} in ${message.channel}`)
      .addFields({ name: `Message:`, value: `${messageRecord}`, inline: true }, { name: `Filtered:`, value: `__${filtered}__`, inline: true })
      .setFooter(
        `Jaden's Empire Moderation`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setColor("#FF3E3E")
      .setTimestamp();
      loggingChannel.send(logEmbed);
    }

    for (var i in blacklisted) {
      if (messageRecord.toLowerCase().includes(blacklisted[i].toLowerCase()) && !foundInText) foundInText = true, log(blacklisted[i]);
    }
    for (var i in blacklisted2) {
      if (
        messageRecord.toLowerCase() === blacklisted2[i].toLowerCase() || messageRecord.toLowerCase().includes(` ${blacklisted2[i].toLowerCase()} `) || messageRecord.toLowerCase().includes(`||${blacklisted2[i].toLowerCase()}||`) || messageRecord.toLowerCase().includes(` ${blacklisted2[i].toLowerCase()}`) && !foundInText) foundInText = true, log(blacklisted2[i]);
    }

    if (foundInText) {
      message.delete();

      let dankMemer = message.guild.channels.cache.find(x => x.name === '🐸・dank-memer')
      if (!dankMemer) {
        console.log('Error when finding dank memer channel')

      } else if (message.channel === dankMemer) {
        return;

      }

      let warnTarget = messageWriter;
      let warnMod = client.user;
      let warnModNAME = "Jaden's Utilities";
      let warnReason = "Bad word usage";

      let swearWarning = new Discord.MessageEmbed()
        .setDescription(`❗ ${messageWriter} swearing is not allowed ❗`)
        .setColor("#FF3E3E");

      let warnMessageChannelSend = new Discord.MessageEmbed()
        .setColor("FF3E3E")
        .setAuthor(
          `${warnTarget.tag} has been warned`,
          warnTarget.displayAvatarURL()
        )
        .setDescription(`**Reason:** ${warnReason}`);

      if (!messageMember.hasPermission("ADMINISTRATOR")) {
        messageChannel.send(warnMessageChannelSend);
      } else {
        messageChannel
          .send(swearWarning)
          .then((m) => m.delete({ timeout: 5000 }));
      }

      var currentDateAndTime1 = new Date().toLocaleString();
      var currentDateAndTime = currentDateAndTime1
        .slice(0, -3)
        .split("/2020,")
        .join(", ");

      function warnUser(warnReason, warnTarget, warnMod, mutedStatus) {
        serverLog(messageWriter, "WARN", warnMod, warnReason);

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

      if (!messageMember.hasPermission("ADMINISTRATOR")) {
        if (warnsNumber.has(`${warnTarget.id}_1`)) {
          let mutedStatus = true;

          warnUser(warnReason, warnTarget, warnMod, mutedStatus);

          let mutetime = 120000;

          serverLog(
            messageMember.user,
            "MUTED",
            client.user,
            "Too many infractions",
            "2 Minutes"
          );

          messageMember.roles.add(
            message.guild.roles.cache.find((r) => r.name === "Muted")
          );

          warnsNumber.delete(`${warnTarget.id}_1`);

          setTimeout(function () {
            if (
              messageMember.roles.cache.some((role) => role.name === "Muted")
            ) {
              messageMember.roles.remove(
                message.guild.roles.cache.find((r) => r.name === "Muted")
              );
              serverLog(messageMember.user, "UNMUTED", client.user, "", "");
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
    }
  },
};
