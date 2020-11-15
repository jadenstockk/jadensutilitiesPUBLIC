const Discord = require("discord.js");
const alexa = require("alexa-bot-api");
var chatbot = new alexa("aw2plm");

module.exports = {
  name: "chatbot",
  description: "server chatbot",

  execute(message, args) {
    if (message.channel.type === "dm") return;

    let chatChannel = message.guild.channels.cache.find(
      (x) => x.name === "🛠・chat-with-jadens-utilities"
    );

    if (message.channel === chatChannel) {
      if (message.author.bot) return;
      let content = message.content;
      message.channel.startTyping();
      chatbot.getReply(content).then((r) => message.channel.send(r));
      message.channel.stopTyping();
    }
  },
};
