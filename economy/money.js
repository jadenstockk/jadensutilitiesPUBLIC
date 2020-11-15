module.exports = {
  name: "money",
  description: "view how much money you have",

  execute(message, args) {
    const Discord = require("discord.js");

    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    if (!user) return message.reply('please enter a valid user.');
    if (user.bot) return message.reply('please enter a valid user.');

    const money = require("../models/economy");

    money.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {

        if (err) console.log(err);

        if (!data) {
          let userMoney = 0;

          let balanceEmbed = new Discord.MessageEmbed()
          .setDescription(`${user} currently has **${userMoney} Bentleys**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setTimestamp();

          message.channel.send(balanceEmbed);

        } else {
          
          let userMoney = data.Money;

          let balanceEmbed = new Discord.MessageEmbed()
          .setDescription(`${user} currently has **${userMoney} Bentleys**`)
          .setFooter(
            `Jaden's Empire Economy`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setColor("#059DFF")
          .setTimestamp();

          message.channel.send(balanceEmbed);
        }
      }
    );
  },
};
