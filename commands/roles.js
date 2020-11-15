const Discord = require("discord.js");

global.rolesList = new Discord.MessageEmbed()
  .setColor("#059DFF")
  .setTitle("📖 Jaden's Empire Roles: 📖")
  .addFields(
    { name: "⠀", value: "⠀" },
    {
      name: "1. 🧔 Random Person",
      value:
        "This role is the very minimum. You are very limited and cannot send messages.\n",
    },
    {
      name: "2. 🙂 Member (Unlocks at LEVEL 0)",
      value:
        "This is the standard role of the sever, when you join you are granted this role.\n",
    },
    {
      name: "3. 🤠 Fairly Important Person (Unlocks at LEVEL 5)",
      value:
        "This role allows you to send files and embed links on the server.\n",
    },
    {
      name: "4. 😄 VIP (Unlocks at LEVEL 10)",
      value:
        "This role allows you to hangout in the VIP EXCLUSIVE area and change your name colour.\n",
    },
    {
      name: "5. 🤩 Extra VIP (Unlocks at LEVEL 20)",
      value: "This role allows you to change your nickname.\n",
    },
    {
      name: "6. 😎 MVIP (Unlocks at LEVEL 25)",
      value: "This role gives you access to the MVIP EXCLUSIVE area.\n",
    },
    {
      name: "7. 😍 Extra MVIP (Unlocks at LEVEL 35)",
      value:
        "This role allows you to send text to speech messages and get priority when speaking in voice channels.\n",
    },
    {
      name: "8. 🧒 Heir to Royalty (Unlocks at LEVEL 50)",
      value:
        "This role allows you to move people to different voice channels.\n",
    },
    {
      name: "9. 👑 Royalty (Unlocks at LEVEL 65)",
      value:
        "This role allows you to access the ROYALTY EXCLUSIVE area and to mute people in calls.\n",
    },
    {
      name: "10. 👑 High Royalty (Unlocks at LEVEL 75)",
      value: "This role allows you to deafen people in calls.\n",
    },
    {
      name: "11. 👑 Ruler (Unlocks at LEVEL 85)",
      value:
        "This role allows you to see the MODERATION area (shows all server events such as kicks, bans, mutes etc.) on the server.\n",
    },
    {
      name: "12. 👑 Above Ruler (Unlocks at LEVEL 95)",
      value: "This role allows you to kick and ban people from the server.\n",
    },
    {
      name: "13. 👑 King (Unlocks at LEVEL 100)",
      value: "This role unlocks many server management features and tools.\n\n",
    },
    { name: "⠀", value: "⠀" },
    {
      name: "OTHER ROLES",
      value:
        "\n\n •👨‍👩‍👧‍👧 Community - This role unlocks when you reach LEVEL 1. Check out the #⋆😊community channel for information. \n\n •🥇 Original Member - This role was only granted to the first people on the server \n\n •🔒 Moderators - This role belongs to the people who help out and moderate the server. \n\n •📍 Inviter - This role is given to you when you send 3 invites to different people and they join the server. \n\n •💿 DJ - This role is given to you when you can be trusted with choosing the right jams :sunglasses: (very exclusive) \n\n •💜 Server Booster - Get this special role when you boost the server! (gives you permissions equal to a 🤩 Extra VIP) \n\n •🥐 Croissant Squad - This is just a random role... no idea why it even exists \n •Muted - This role is given to you as punishment and doesn't allow you to talk :)",
    }
  )
  .setFooter(
    `Jaden's Empire Roles`,
    "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
  );

module.exports = {
  name: "roles",
  description: "get a list of all the roles of Jaden's Empire and what they do",

  execute(message, args) {
    let confirmationMessage = new Discord.MessageEmbed()
      .setDescription(
        `📖 **Sent you the server roles list ${message.author}!** 📖`
      )
      .setColor("#059DFF");

    message.channel.send(confirmationMessage);
    message.author.send(rolesList);
  },
};
