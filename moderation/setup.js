const Discord = require("discord.js");

module.exports = {
  name: "setup",
  description: "admin setup options",

  execute(message, args) {
    let command = args[0];

    if (message.member.roles.cache.some((role) => role.name === "🔑 Admin")) {
      if (command === "support") {
        let supportEmbed = new Discord.MessageEmbed()
          .setTitle("Need some help? Contact a Moderator!")
          .setDescription(
            "Click the ❔ below to open a support ticket for assistance"
          )
          .setFooter(
            `Jaden's Empire Support`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF");

        async function supportChannel() {
          await message.channel.send({ files: ["./banners/Support.png"] });
          message.channel.send(supportEmbed).then(async function (message) {
            await message.react("❔");
          });
        }
        supportChannel();

        message.delete();
      } else if (command === "rules") {
        async function rulesChannel() {
          await message.channel.send({ files: ["./banners/Rules.png"] });
          message.channel.send(rulesList);
        }
        rulesChannel();

        message.delete();
      } else if (command === "roles") {
        async function rolesChannel() {
          await message.channel.send({ files: ["./banners/Roles.png"] });

          let levelUpdates = message.guild.channels.cache.find(
            (x) => x.name === "🏆・level-updates"
          );
          let botCommands = message.guild.channels.cache.find(
            (x) => x.name === "🤖・bot-commands"
          );
          let supportChannelLink = message.guild.channels.cache.find(
            (x) => x.name === "👪・support"
          );

          let introRoleMessage = new Discord.MessageEmbed()
            .setTitle("ROLES AND LEVELS OF JADEN'S EMPIRE")
            .setDescription(
              `Different roles give you different or more advanced permissions and perks on the server. You can earn roles by levelling up on the server (levels are earned by being active on the server, sending messages, and spending time in voice channels), and to get roles even faster, you can take part in server challenges and other events etc. \n\n **When you go up a level, if will be announced in the ${levelUpdates} channel.** \n **Type *!rank* in the ${botCommands} channel to find out your current level, and check the server member list to see your current role** \n\n **Visit ${supportChannelLink} if you have any questions or problems**`
            )
            .setColor("#059DFF");

          await message.channel.send(introRoleMessage);
          message.channel.send(rolesList);
        }
        rolesChannel();

        message.delete();
      } else if (command === "accept") {
        let rulesChannel = message.guild.channels.cache.find(
          (x) => x.name === "📜・rules"
        );

        let acceptEmbed = new Discord.MessageEmbed()
          .setTitle("❌ You are unverified! ❌")
          .setDescription(
            `Type "!accept" in this channel to verify you have read and accept the ${rulesChannel}`
          )
          .setFooter(
            `Jaden's Empire Rules`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF");

        async function verifyChannel() {
          await message.channel.send({ files: ["./banners/Verify.png"] });
          message.channel.send(acceptEmbed);
        }
        verifyChannel();

        message.delete();
      } else if (command === "settings") {
        let embed1 = new Discord.MessageEmbed()
          .setTitle("⚙ Customize/Self Roles ⚙")
          .setDescription(`React to the things that apply to you below`)
          .setColor("#059DFF");

        let embed2 = new Discord.MessageEmbed()
          .addFields({
            name: `Exclusive Channels:`,
            value: `✍ Private Spam Gang`,
          })
          .setFooter(
            `Jaden's Empire Customize`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF");

        let embed3 = new Discord.MessageEmbed()
          .addFields({
            name: `Notifications:`,
            value: `\n 🎊 Tournaments \n 🎮 Gamer Saturdays \n 🔔 Server Announcements`,
          })
          .setFooter(
            `Jaden's Empire Customize`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF");

        let embed4 = new Discord.MessageEmbed()
          .addFields({
            name: `Your Pronouns:`,
            value: `👦 He/Him \n 👧 She/Her \n 🙂 They/Them`,
          })
          .setFooter(
            `Jaden's Empire Customize`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF");

        async function settingsChannel() {
          await message.channel.send({ files: ["./banners/Customize.png"] });

          message.channel.send(embed1);

          message.channel.send(embed2).then(async function (message) {
            await message.react("✍");
          });

          message.channel.send(embed3).then(async function (message) {
            await message.react("🎊");
            await message.react("🎮");
            await message.react("🔔");
          });

          message.channel.send(embed4).then(async function (message) {
            await message.react("👦");
            await message.react("👧");
            await message.react("🙂");
          });
        }
        settingsChannel();

        message.delete();
      } else if (command === "rooms") {
        message.delete();

        let roomsEmbed = new Discord.MessageEmbed()
          .setTitle("Welcome to Jaden's Empire Rooms")
          .setDescription(`**Commands:**\n`)
          .addFields(
            {
              name: `create`,
              value: `request to have a room created for you!`,
            },
            {
              name: `add (@user/@everyone)`,
              value: `request to have someone allowed to go into your room!`,
            },
            {
              name: `remove (@user/@everyone)`,
              value: `request to have someone not allowed to go into your room!`,
            }
          )
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF");

        message.channel.send(roomsEmbed);
      }
    }
  },
};
