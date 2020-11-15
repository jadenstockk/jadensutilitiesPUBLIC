module.exports = {
  name: "give",
  description: "transfer money into someone elses bank account",

  execute(message, args) {
    const Discord = require("discord.js");

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.reply('please enter a valid user.');
    if (user.user.bot) return message.reply('please enter a valid user.');

    let amount = args[1];
    if (!amount || isNaN(amount) || amount < 1) return message.reply("please provide a valid amount.");

    let transferEmbed = new Discord.MessageEmbed()
      .setTitle("Bank Transfer")
      .addFields(
        { name: "To:", value: user },
        { name: "Amount", value: amount + " Bentleys" },
        { name: "From:", value: message.author }
      )
      .setFooter(`Jaden's Empire Economy`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
      .setColor("#059DFF")
      .setThumbnail("https://www.pngkey.com/png/full/817-8178976_save-more-make-more-money-arrow-cool-pictures.png")
      .setTimestamp();

      const money = require("../models/economy");

      money.findOne(
        { Guild: message.guild.id, User: message.author.id },
        async (err, data) => {

          if (err) console.log(err);

          if (!data) {
              
            return message.reply("you do not have enough money to make this transaction.");

          } else {

            if (data.Money < amount) return message.reply("you do not have enough money to make this transaction.");

            message.channel.send(transferEmbed);

            data.Money = data.Money - amount;
            data.save();
          }
        }
      );

      money.findOne(
        { Guild: message.guild.id, User: user.id },
        async (err, data) => {

          if (err) console.log(err);

          if (!data) {
              
            let newMoney = new money({
              User: user.id,
              Guild: message.guild.id,
              Money: amount
            });
            newMoney.save();

          } else {

            data.Money = data.Money + amount;
            data.save();
          }
        }
      );
  },
};
