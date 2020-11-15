const fun = require("../fun/fun");

module.exports = {
    name: "divorce",
    description: "divorce your no longer loved one",
  
    execute(message, args) {
      const Discord = require("discord.js");
      const family = require("../models/family");
  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!user) user = 'unknown'
  
      let divorceEmbed = new Discord.MessageEmbed()
        .setTitle("💔 Divorced 💔")
        .setDescription(`${message.author} made up their mind and decided to divorce <@${user}>`)
        .setFooter(`Jaden's Empire Family`, "https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
        .setThumbnail('https://cdn.shopify.com/s/files/1/1061/1924/products/Diamond_Ring_Emoji_large.png?v=1571606064')
        .setColor("#059DFF")
        .setTimestamp();

        function divorce() {
          message.channel.send(divorceEmbed)

            family.findOne(
              { Guild: message.guild.id, User: user.id },
              async (err, data) => {
      
                if (err) console.log(err);
      
                if (!data) {
                    
                    let newFamily = new family({
                        User: message.author.id,
                        Guild: message.guild.id,
                        Partner: user
                      });
    
                      newFamily.save();
      
                } else {
      
                  data.Partner = user
                  data.save();
                }
    
              }
            );

            family.findOne(
                { Guild: message.guild.id, User: message.author.id },
                async (err, data) => {
        
                  if (err) console.log(err);
        
                  if (!data) {
        
                  } else {
        
                      data.Partner = null;
                      data.save();
                  }
                }
              );
        }

        family.findOne(
            { Guild: message.guild.id, User: message.author.id },
            async (err, data) => {
    
              if (err) console.log(err);
    
              if (!data) {
                return message.reply("you aren't in a relationship.");                  

              } else {
                  if (data.Partner) return message.reply("you aren't in a relationship.");
                  if (!data.Partner === user.id) return message.reply("you aren't in a relationship with this user.");
                  if (user === 'unknown') {
                    check2(data.Partner);

                  } else {
                    check2(user.id);

                  }
 
              }
            }
          );
        
          function check2(user) {
            family.findOne(
              { Guild: message.guild.id, User: user },
              async (err, data) => {
      
                if (err) console.log(err);
                
                if (!data) {
                    return message.reply("you aren't in a relationship with this user.");

                } else {
                  if (!data.Partner === message.author.id) return message.reply("you aren't in a relationship with this user.");
                  if (data.Partner) return message.reply("you aren't in a relationship with this user.");
                  divorce(user);
                }
              }
            );
          }
      }
}