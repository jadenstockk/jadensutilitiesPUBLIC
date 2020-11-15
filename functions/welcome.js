module.exports = {
  name: "welcome",
  description: "server welcome message",

  execute(member, args, client) {
    const Discord = require("discord.js");

    if (member.user.bot) return;

    let welcomeChannel = member.guild.channels.cache.find(
      (x) => x.name === "😄・welcome"
    );
    let rulesChannel = member.guild.channels.cache.find(
      (x) => x.name === "📜・rules"
    );
    let verifyChannel = member.guild.channels.cache.find(
      (x) => x.name === "✅・verify"
    );
    let serverEmoji = member.guild.emojis.cache.find(
      (emoji) => emoji.name === "theUltimateJaden"
    );

    let unverifiedRole = member.guild.roles.cache.find(
      (role) => role.name === "❌ Unverified"
    );
    let memberRole = member.guild.roles.cache.find(
      (role) => role.name === "🙂 Member"
    );

    let welcomeDm = new Discord.MessageEmbed()
      .setDescription(
        `**Hey there! Welcome to Jaden's Empire!**\n\n If you haven't already accepted the ${rulesChannel}, please head over to the ${verifyChannel} channel and type "!accept"\n\n***If you don't verify yourself, you won't have access to all the fancy channels the server has to offer! :)***`
      )
      .setFooter(
        `Jaden's Empire Welcome`,
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
      .setColor("#059DFF");

    member.roles.add(unverifiedRole);
    member.roles.add(memberRole);

    welcomeChannel.send(
      `${serverEmoji} **Welcome to Jaden's Empire ${member.user}! We hope you enjoy spending time here** ${serverEmoji}\n*Please read and accept the ${rulesChannel} before carrying on*`
    );
    member.send(welcomeDm);

    serverLog(member.user, "joined", "", "");
  },
};
