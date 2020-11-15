module.exports = {
  name: "urban",
  description: "search for a word",

  execute(message, args) {
    const Discord = require("discord.js");
    const urban = require("urban-dictionary");

    let definition = args.slice(0).join(" ");
    let entriesNumber = 0;

    if (!definition) return;

    urban.term(definition, (error, entries, tags, sounds) => {
      if (error) {
        let definitionEmbed = new Discord.MessageEmbed()
          .setTitle(`Urban Dictionary Search`)
          .addFields(
            { name: "Word:", value: definition },
            { name: "Definition:", error }
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Dictionary`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");

        message.channel.send(definitionEmbed);
      } else {
        let definitionEmbed = new Discord.MessageEmbed()
          .setTitle(`Urban Dictionary Search`)
          .addFields(
            { name: "Word:", value: entries[entriesNumber].word },
            { name: "Definition:", value: entries[entriesNumber].definition },
            { name: "Example:", value: entries[entriesNumber].example },
            { name: "👍", value: entries[entriesNumber].thumbs_up },
            { name: "👎", value: entries[entriesNumber].thumbs_down },
            { name: "Author:", value: entries[entriesNumber].author }
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Dictionary`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png");

        message.channel.send(definitionEmbed);
      }
    });
  },
};
