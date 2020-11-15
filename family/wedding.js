module.exports = {
  name: "wedding",
  description: "organise a wedding",

  execute(message, args) {
    const Discord = require("discord.js");
    const family = require("../models/family");

    let weddingsChannel = message.guild.channels.cache.find(
      (x) => x.name === "💒・weddings"
    );

    family.findOne(
        { Guild: message.guild.id, User: message.author.id },
        async (err, data) => {

          if (err) console.log(err);

          if (!data) {
            return message.reply("you aren't in a relationship. You have to propose to somebody first.");
            

          } else {
            if (!data.Partner) return message.reply("you aren't in a relationship. You have to propose to somebody first.");
            let target = `<@${data.Partner}>`;
            weddingOrganize(target);

          }
        }
      );

      function weddingOrganize(target) {

    let day = args.slice(0).join(" ");
    if (!day) return message.reply(`**please provide a date, time and timezone.**`);

    let confirmationMessage = new Discord.MessageEmbed()
      .setDescription(
        `💒 **Check out ${message.author} and ${target}'s wedding details in the ${weddingsChannel} channel!** 💒`
      )
      .setColor("#059DFF");

    message.channel.send(confirmationMessage);

    function acceptWedding() {
      let weddingMessage = new Discord.MessageEmbed()
        .setColor("#059DFF")
        .setTitle(`💒💍 New Wedding! 💍💒`)
        .setDescription(
          `Come celebrate ${message.author} and ${target} on their special day!`
        )
        .addFields({ name: "Date and Time:", value: day })
        .setFooter(
          `Jaden's Empire Weddings`,
          "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
        )
        .setThumbnail(
          "https://pngimg.com/uploads/wedding/wedding_PNG19483.png"
        );

      weddingsChannel.send(weddingMessage).then((message) => {
        message.react("✅");
      });
    }
    acceptWedding();
  }
  },
};
