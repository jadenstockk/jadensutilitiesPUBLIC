module.exports = {
  name: "setmoney",
  description: "set a user's balance",

  execute(message, args) {
    const Discord = require("discord.js");
    const db = require("quick.db");

    if (message.member.roles.cache.some((role) => role.name === "🔑 Admin")) {
      let targetUser = message.mentions.users.first() || message.author;
      let amount = Number(args.slice(1) || args.slice(0));

      if (!targetUser) {
        message
          .reply("**could not find the user you are looking for.**")
          .then((m) => m.delete({ timeout: 1000 }));
      } else if (amount < 1) {
        message
          .reply("**please enter an amount larger than 0.**")
          .then((m) => m.delete({ timeout: 1000 }));
      } else if (!amount) {
        message
          .reply("**please enter a valid amount**")
          .then((m) => m.delete({ timeout: 1000 }));
      } else {
        db.set(`money_${message.guild.id}_${targetUser.id}`, amount);

        let setEmbed = new Discord.MessageEmbed()
          .setTitle("Set User's Balance")
          .addFields(
            { name: "User:", value: targetUser },
            { name: "Balance:", value: amount + " Bentleys" }
          )
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setThumbnail(
            "https://www.pngkey.com/png/full/817-8178976_save-more-make-more-money-arrow-cool-pictures.png"
          )
          .setTimestamp();

        message.channel.send(setEmbed);
      }
    }
  },
};
