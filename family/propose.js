const fun = require("../fun/fun");

module.exports = {
    name: "propose",
    description: "get down on one knee to someone on the server!",
  
    execute(message, args) {
      const Discord = require("discord.js");
      const family = require("../models/family");
  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user) return message.reply('please enter a valid user.');
  
      let proposeEmbed = new Discord.MessageEmbed()
        .setTitle("💍 Marriage Proposal 💍")
        .setDescription(`${message.author} gets down on one knee and asks ${user} to marry them!\n\n*${user} respond with **yes** or **no***`)
        .setFooter(`Jaden's Empire Family`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
        .setThumbnail('https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Ring_Emoji_large.png?v=1571606064')
        .setColor("#059DFF")
        .setTimestamp();

        function approveYes() {
          let yesEmbed = new Discord.MessageEmbed()
          .setTitle("💍🎉 Marriage Proposal Accepted 🎉💍")
          .setDescription(`${message.author} and ${user} are now fiancés!\n\n*Type "!wedding (user) (date and time) (timezone)" to shedule a wedding*`)
          .setFooter(`Jaden's Empire Family`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setThumbnail('https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Ring_Emoji_large.png?v=1571606064')
          .setTimestamp();

          message.channel.send(yesEmbed);
        }

        function approveNo() {
          let noEmbed = new Discord.MessageEmbed()
          .setTitle("💍❌ Marriage Proposal Denied ❌💍")
          .setDescription(`${user} denied ${message.author}'s wholesome proposal!`)
          .setFooter(`Jaden's Empire Family`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setThumbnail('https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Ring_Emoji_large.png?v=1571606064')
          .setTimestamp();

          message.channel.send(noEmbed);
        }

        function approveGhosted() {
          let ghostedEmbed = new Discord.MessageEmbed()
          .setTitle("💍👻 Marriage Proposal Ghosted 👻💍")
          .setDescription(`${user} didn't respond to ${message.author}'s proposal in time!`)
          .setFooter(`Jaden's Empire Family`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setThumbnail('https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Ring_Emoji_large.png?v=1571606064')
          .setTimestamp();

          message.channel.send(ghostedEmbed);
        }

        function propose() {
          message.channel.send(proposeEmbed)

            family.findOne(
              { Guild: message.guild.id, User: user.id },
              async (err, data) => {
      
                if (err) console.log(err);
      
                if (!data) {
                    
                    let newFamily = new family({
                        User: message.author.id,
                        Guild: message.guild.id,
                        Partner: user.id
                      });
    
                      newFamily.save();
      
                } else {
      
                  data.Partner = user.id
                  data.save();
                }
    
              }
            );
      
            family.findOne(
              { Guild: message.guild.id, User: message.author.id },
              async (err, data) => {
      
                if (err) console.log(err);
      
                if (!data) {
                    
                    let newFamily = new family({
                        User: message.author.id,
                        Guild: message.guild.id,
                        Partner: user.id
                  });
                  newFamily.save();
      
                } else {
      
                    data.Partner = user.id
                    data.save();
                }
              }
            );
          
          message.channel.awaitMessages(m => m.author.id === user.id,
            {max: 1, time: 30000}).then(collected => {

                    if (collected.first().content.toLowerCase() == 'yes') {
                            approveYes();

                    } else
                            approveNo();

            }).catch(() => {

                    approveGhosted();
            });
        }

        function check2() {
          family.findOne(
            { Guild: message.guild.id, User: user.id },
            async (err, data) => {
    
              if (err) console.log(err);
              
              if (!data) {
                propose();

              } else {
                if (data.Partner) {
                  return message.reply("this user is already in a relationship.")

                } else {
                  propose();
                }
                }
              }
          );
        }

        family.findOne(
            { Guild: message.guild.id, User: message.author.id },
            async (err, data) => {
    
              if (err) console.log(err);
    
              if (!data) {
                check2();

              } else {
                  if (data.Partner) return message.reply("you are already in a relationship... you tryna cheat there bro? 👀");
                  check2();
              }
            }
          );
      }
}