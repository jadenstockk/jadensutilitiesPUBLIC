module.exports = {
    name: "family",
    description: "view who's in your family",
  
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
              return message.reply("you aren't in a family. Shame lol.");
              
  
            } else {
                let parents = data.Parents
  
            }
          }
        );
    },
  };