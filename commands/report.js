module.exports = {
  name: "report",
  description: "report a user",

  execute(message, args) {
    const Discord = require("discord.js");

    let confirmationMessage = new Discord.MessageEmbed()
      .setDescription(
        `📣 **Your report has been submitted ${message.author}** 📣`
      )
      .setColor("#059DFF");

    message.delete();

    let target =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!target)
      return message.channel
        .send("**Please provide a user that you wish to report**")
        .then((m) => m.delete({ timeout: 5000 }));

    let reason = args.slice(1).join(" ");
    if (!reason)
      return message.channel
        .send(`**Please provide a reason for reporting ${message.author}**`)
        .then((m) => m.delete({ timeout: 5000 }));

    let reportChannel = message.guild.channels.cache.find(
      (x) => x.name === "🔒・reports"
    );

    let timeOfReport = new Date();

    message.channel.send(confirmationMessage);
    let reportSlip = new Discord.MessageEmbed()
      .setColor("#059DFF")
      .setTitle("New User Report:")
      .addFields(
        { name: "Reported by:", value: message.author },
        { name: "User Reported:", value: target },
        { name: "Reason:", value: reason }
      )
      .setFooter("Time of Report: " + timeOfReport)
      .setThumbnail("https://images.emojiterra.com/mozilla/512px/1f4e2.png");
    reportChannel.send(reportSlip);
  },
};
