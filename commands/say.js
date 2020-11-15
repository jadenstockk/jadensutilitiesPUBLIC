module.exports = {
  name: "say",
  description: "get me to say something",

  execute(message, args) {
    const Discord = require("discord.js");
    const { blacklisted } = require("../blacklist.json");

    if (!message.member.roles.cache.some((role) => role.name === "🔑 Admin"))
      return;

    let sayPhrase = args.slice(0).join(" ");
    let foundInText = false;

    for (var i in blacklisted) {
      if (sayPhrase.toLowerCase().includes(blacklisted[i].toLowerCase()))
        foundInText = true;
    }

    if (!foundInText) {
      message.channel.send(sayPhrase);
      message.delete();
    } else {
      message.delete();
    }
  },
};
