module.exports = {
  name: "tournament",
  description: "tournament commands",

  execute(message, args) {
    const Discord = require("discord.js");

    let command = args[0];

    if (
      message.member.roles.cache.some((role) => role.name === "🔑 Admin") ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      if (command === `winner`) {
        message.delete();

        let role = message.guild.roles.cache.get(args[3]);
        if (!role) return;

        let user = message.mentions.members.first();
        if (!user) return;

        let week = args[2];
        if (!week) return;

        let winnerEmbed = new Discord.MessageEmbed()
          .setDescription(
            `🏆 **Congratulations to ${user} for winning week ${week}! You have been moved up to a ${role}** 🏆`
          )
          .setColor("FFE24F");

        message.channel.send(winnerEmbed);
      } else if (command === `chat`) {
        message.delete();

        let chatEmbed = new Discord.MessageEmbed()
          .setTitle(`Jaden's Empire Tournament Chat`)
          .setDescription(`You are free to chat here during the competition!`)
          .setColor("#059DFF")
          .setThumbnail(
            `https://images-ext-1.discordapp.net/external/L0W0d42yWQs2MhMeRT00s-ftFqqIL0y23o3nZGScxcU/%3Fwidth%3D918%26height%3D677/https/images-ext-2.discordapp.net/external/mDvuL6YyZ3CLWTVo5BErlMiHnz0kAHKy9A3Djt-eAWo/https/cdn.probot.io/DDRxUmJFkS.png?width=643&height=475`
          );

        message.channel.send(chatEmbed);
      } else if (command === `answers`) {
        message.delete();

        let answersEmbed = new Discord.MessageEmbed()
          .setTitle(`Jaden's Empire Tournament Answers`)
          .setDescription(
            `Please do not use this channel unless you are typing an answer`
          )
          .setColor("#059DFF")
          .setThumbnail(
            `https://images-ext-1.discordapp.net/external/L0W0d42yWQs2MhMeRT00s-ftFqqIL0y23o3nZGScxcU/%3Fwidth%3D918%26height%3D677/https/images-ext-2.discordapp.net/external/mDvuL6YyZ3CLWTVo5BErlMiHnz0kAHKy9A3Djt-eAWo/https/cdn.probot.io/DDRxUmJFkS.png?width=643&height=475`
          );

        message.channel.send(answersEmbed);
      } else if (command === `options`) {
        message.delete();

        let tournamentTag = message.guild.roles.cache.find(
          (r) => r.name === "🎊 Tournament"
        );
        let serverEmoji = message.guild.emojis.cache.find(
          (emoji) => emoji.name === "theUltimateJaden"
        );

        let option1 = "Guess the Famous Person *(closeup picture)*";
        let option2 = "Jackbox";
        let option3 = "Hunger Games Trivia";

        let optionsEmbed = new Discord.MessageEmbed()
          .setTitle(`Choose your preferred suggestion below`)
          .setDescription(
            `**Option 1:** ${option1}\n**Option 2:** ${option2}\n**Option 3:** ${option3}`
          )
          .setColor("#059DFF")
          .setThumbnail(
            `https://images-ext-1.discordapp.net/external/L0W0d42yWQs2MhMeRT00s-ftFqqIL0y23o3nZGScxcU/%3Fwidth%3D918%26height%3D677/https/images-ext-2.discordapp.net/external/mDvuL6YyZ3CLWTVo5BErlMiHnz0kAHKy9A3Djt-eAWo/https/cdn.probot.io/DDRxUmJFkS.png?width=643&height=475`
          );

        message.channel
          .send(
            `${serverEmoji}  **Hey ${tournamentTag}, for this Friday's tournament, you can vote for a topic/activity.** ${serverEmoji}`,
            optionsEmbed
          )
          .then((message) => {
            message.react("1️⃣");
            message.react("2️⃣");
            message.react("3️⃣");
          });
      } else if (command === `display`) {
        message.delete();

        let tournamentTag = message.guild.roles.cache.find(
          (r) => r.name === "🎊 Tournament"
        );
        let serverEmoji = message.guild.emojis.cache.find(
          (emoji) => emoji.name === "theUltimateJaden"
        );
        let chatChannel = message.guild.channels.cache.find(
          (x) => x.name === "💬・chat"
        );
        let questionsChannel = message.guild.channels.cache.find(
          (x) => x.name === "❔・questions"
        );

        let week = args[1];
        if (!week || isNaN(week)) return;

        let theme = args.slice(2).join(" ");

        let displayEmbed = new Discord.MessageEmbed()
          .setTitle(`**Week ${week} of Jaden's Empire Tournaments**`)
          .setDescription(
            `**${theme}**\n\nIt will be hosted at 8pm under the **🔴 LIVE 🔴** voice channel. You will be able to chat before the event in the ${chatChannel} channel.\n***(All tournament channels are currently disabled)*** \n\n*Visit the ${questionsChannel} channel if you have any queries*`
          )
          .setColor("#059DFF")
          .setThumbnail(
            `https://images-ext-1.discordapp.net/external/L0W0d42yWQs2MhMeRT00s-ftFqqIL0y23o3nZGScxcU/%3Fwidth%3D918%26height%3D677/https/images-ext-2.discordapp.net/external/mDvuL6YyZ3CLWTVo5BErlMiHnz0kAHKy9A3Djt-eAWo/https/cdn.probot.io/DDRxUmJFkS.png?width=643&height=475`
          )
          .setFooter(
            `Jaden's Empire Tournaments`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          );

        message.channel.send(`${tournamentTag}`, displayEmbed);
      } else if (command === `reminder`) {
        message.delete();

        let tournamentTag = message.guild.roles.cache.find(
          (r) => r.name === "🎊 Tournament"
        );
        let serverEmoji = message.guild.emojis.cache.find(
          (emoji) => emoji.name === "theUltimateJaden"
        );
        let chatChannel = message.guild.channels.cache.find(
          (x) => x.name === "💬・chat"
        );
        let questionsChannel = message.guild.channels.cache.find(
          (x) => x.name === "❔・questions"
        );

        let displayEmbed = new Discord.MessageEmbed()
          .setDescription(
            `**Just a reminder that today's tournament starts soon! Join the ${chatChannel}**`
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Tournaments`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          );

        message.channel.send(`${tournamentTag}`, displayEmbed);
      } else if (command === `close`) {
        message.delete();

        let tournamentTag = message.guild.roles.cache.find(
          (r) => r.name === "🎊 Tournament"
        );
        let serverEmoji = message.guild.emojis.cache.find(
          (emoji) => emoji.name === "theUltimateJaden"
        );
        let tournamentEmoji = message.guild.emojis.cache.find(
          (emoji) => emoji.name === "Tournaments"
        );
        let chatChannel = message.guild.channels.cache.find(
          (x) => x.name === "💬・chat"
        );
        let questionsChannel = message.guild.channels.cache.find(
          (x) => x.name === "❔・questions"
        );

        message.channel.send(
          `${tournamentEmoji} ***channel closed*** ${tournamentEmoji}`
        );
      }
    }
  },
};
