module.exports = {
  name: "room",
  description: "room editing",

  execute(message, args) {
    const Discord = require("discord.js");
    if (message.author.bot) return;

    let roomChannel = message.guild.channels.cache.find(
      (x) => x.name === "☉📝my-room"
    );
    let roomRequestsChannel = message.guild.channels.cache.find(
      (x) => x.name === "🔒・room-requests"
    );

    if (message.channel === roomChannel) {
      message.delete();
      if (message.content.toLowerCase().includes("create")) {
        let roomTarget = message.author;
        let roomCreateMessage = new Discord.MessageEmbed()
          .setAuthor(
            `Succesfully sent a request to create a room for ${roomTarget.tag}`,
            message.author.displayAvatarURL()
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        message.author.send(roomCreateMessage);

        let roomCreateLog = new Discord.MessageEmbed()
          .setTitle("Room Create Request")
          .addFields({ name: "User:", value: message.author })
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        roomRequestsChannel.send(roomCreateLog);
      } else if (message.content.toLowerCase().includes("add")) {
        let roomTarget = message.author;
        let roomAdd = message.mentions.members.first();
        if (!roomAdd) return;
        let roomCreateMessage = new Discord.MessageEmbed()
          .setAuthor(
            `Room "add" request from ${roomTarget.tag} sent`,
            message.author.displayAvatarURL()
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        message.author.send(roomCreateMessage);

        let roomCreateLog = new Discord.MessageEmbed()
          .setTitle("Room Add Request")
          .addFields(
            { name: "User:", value: message.author },
            { name: "Add:", value: roomAdd }
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        roomRequestsChannel.send(roomCreateLog);
      } else if (message.content.toLowerCase().includes("remove")) {
        let roomTarget = message.author;
        let roomRemove = message.mentions.members.first();
        if (!roomRemove) return;
        let roomCreateMessage = new Discord.MessageEmbed()
          .setAuthor(
            `Room "remove" request from ${roomTarget.tag} sent`,
            message.author.displayAvatarURL()
          )
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        message.author.send(roomCreateMessage);

        let roomCreateLog = new Discord.MessageEmbed()
          .setTitle("Room Remove Request")
          .addFields(
            { name: "User:", value: message.author },
            { name: "Remove:", value: roomRemove }
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF")
          .setFooter(
            `Jaden's Empire Rooms`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setTimestamp();
        roomRequestsChannel.send(roomCreateLog);
      }
    }
  },
};
