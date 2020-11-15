const Discord = require("discord.js");

global.rulesList = new Discord.MessageEmbed()
  .setColor("#059DFF")
  .setTitle("📜 Jaden's Empire Rules: 📜")
  .setDescription(
    "#1: Do not harass other users or be toxic, such arguing with or insulting others (in other words, be kind) \n \n #2: No swearing or attempting to bypass the swear filter by changing the characters of a banned word. (Songs with swearing are allowed as long as it isn't excessive) \n \n #3: No inappropriate images/links/speech (Nothing can be shared that is sexual, is relating to substance abuse, is disturbing or that displays a grave nature). \n \n #4: No racism/hate speech. \n \n #5: Please keep your topics in the correct channels.\n \n #6: If there is any problem at all, please message <@541189322007904266> or visit the #★👪support channel. \n \n #7: No spamming - this is only allowed in dedicated spam channels and must not be over the top. (using auto-spammers will result in a warn and temp mute) \n \n #8: Do not post malicious links or files in the server that can steal information. \n \n #9: Avoid posting personal information such as phone numbers or email addresses in chats. \n \n #10: You are not allowed to act as though you are a moderator (this means acting as a moderator by threatening that people will be punished). \n \n #11: Do not argue with @🔒 Moderators when action is taken against you for breaking a server rule. \n \n #12: Do not mention @everyone or mass mention any other role or user."
  )
  .setFooter(
    `Jaden's Empire Rules`,
    "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
  );

module.exports = {
  name: "rules",
  description: "get a list of all the rules on Jaden's Empire",

  execute(message, args) {
    let confirmationMessage = new Discord.MessageEmbed()
      .setDescription(
        `📜 **Sent you the server rules list ${message.author}!** 📜`
      )
      .setColor("#059DFF");

    message.channel.send(confirmationMessage);
    message.author.send(rulesList);
  },
};
