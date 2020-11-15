const { time } = require("console");
const Discord = require("discord.js");
const { TIMEOUT } = require("dns");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const prefix = "!";
const { token } = require("./config.json");
const fs = require("fs");
const ms = require("ms");
const { get } = require("http");
const { RSA_PKCS1_OAEP_PADDING } = require("constants");
const { blacklisted } = require("./blacklist.json");
global.warnsNumber = new Set();
global.timeouts = new Set();
const alexa = require("alexa-bot-api");
const canvacord = require("canvacord");
const { serverLogsID } = require("./config.json");
const { serverLogsTOKEN } = require("./config.json");
const { serverDmsID } = require("./config.json");
const { serverDmsTOKEN } = require("./config.json");
const { serversupport } = require("./config.json");
const { serversupportparent } = require("./config.json");
const { stringify } = require("querystring");
const { join } = require("path");
const unban = require("./moderation/unban");
var chatbot = new alexa("aw2plm");
let repeatXYZ = "1";
const serverLogs = new Discord.WebhookClient(serverLogsID, serverLogsTOKEN);
const dmLogs = new Discord.WebhookClient(serverDmsID, serverDmsTOKEN);


client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.mod = new Discord.Collection();
const modFiles = fs
  .readdirSync("./moderation/")
  .filter((file) => file.endsWith(".js"));
for (const mfile of modFiles) {
  const mcommand = require(`./moderation/${mfile}`);

  client.mod.set(mcommand.name, mcommand);
}

client.fun = new Discord.Collection();
const funFiles = fs
  .readdirSync("./fun/")
  .filter((file) => file.endsWith(".js"));
for (const ffile of funFiles) {
  const fcommand = require(`./fun/${ffile}`);

  client.fun.set(fcommand.name, fcommand);
}

client.functions = new Discord.Collection();
const funcFiles = fs
  .readdirSync("./functions/")
  .filter((file) => file.endsWith(".js"));
for (const fcfile of funcFiles) {
  const fccommand = require(`./functions/${fcfile}`);

  client.functions.set(fccommand.name, fccommand);
}

client.economy = new Discord.Collection();
const economyFiles = fs
  .readdirSync("./economy/")
  .filter((file) => file.endsWith(".js"));
for (const efile of economyFiles) {
  const ecommand = require(`./economy/${efile}`);

  client.economy.set(ecommand.name, ecommand);
}

client.family = new Discord.Collection();
const familyFiles = fs
  .readdirSync("./family/")
  .filter((file) => file.endsWith(".js"));
for (const fffile of familyFiles) {
  const ffcommand = require(`./family/${fffile}`);

  client.family.set(ffcommand.name, ffcommand);
}

client.database = require("./database");

client.once("ready", () => {
  console.log("Jaden's Ultilites is now online ☑");

  client.user.setPresence({
    activity: {
      name: "Jaden's Empire",
      type: "WATCHING",
    },
  });
});

//COMMANDS
client.on("message", (message) => {
  if (message.channel.type === "dm" && !message.author.bot && !message.author === client.user) return dmLogs.send(new Discord.MessageEmbed().setColor("#059DFF").setDescription(`${message.author}\n${message.content}`))
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (client.commands.has(command)) {
    try {
      client.commands.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
    }
  } else if (client.fun.has(command)) {
    try {
      client.fun.get(command).execute(message, args);
    } catch (error) {
      console.error(error);
    }
  } else if (client.mod.has(command)) {
    try {
      client.mod.get(command).execute(message, args, client);
    } catch (error) {
      console.error(error);
    }
  } else if (client.family.has(command)) {
    try {
      client.family.get(command).execute(message, args, client);
    } catch (error) {
      console.error(error);
    }
  } else if (client.economy.has(command)) {
    try {
      client.economy.get(command).execute(message, args, client);
    } catch (error) {
      console.error(error);
    }
  } else {
    return;
  }
});

//USER JOINED
client.on("guildMemberAdd", async (member) => {
  client.functions.get("welcome").execute(member, client);
});

//USER LEAVE
client.on("guildMemberRemove", async (member) => {
  if (!member.bot) {
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: "MEMBER_KICK",
    });
    const kickLog = fetchedLogs.entries.first();

    if (!kickLog) return serverLog(member.user, "left", "", "");

    const { executor, target } = kickLog;

    if (Date.now() - kickLog.createdTimestamp < 5000) {
      let reason = kickLog.reason;
      if (!reason) reason = "Unspecified";

      if (executor === client.user)
        return serverLog(member.user, "left", "", "");

      if (target.id === member.id) {
        serverLog(member.user, "KICK", executor, reason);
        serverLog(member.user, "left", "", "");
      } else {
        serverLog(member.user, "KICK", "Unknown", "Unknown");
        serverLog(member.user, "left", "", "");
      }
    } else {
      serverLog(member.user, "left", "", "");
    }
  } else {
    serverLog(member.user, "left", "", "");
  }
});

//USER BANNED
client.on("guildBanAdd", async (guild, user) => {
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD",
  });

  const banLog = fetchedLogs.entries.first();

  if (!banLog) return;

  const { executor, target } = banLog;

  if (executor === client.user) return;

  let reason = banLog.reason;
  if (!reason) reason = "Unspecified";

  if (target.id === user.id) {
    serverLog(user, "BAN", executor, reason);
  } else {
    serverLog(user, "BAN", "Unknown", "Unknown");
  }
});

//USER UNBANNED
client.on("guildBanRemove", async (guild, user) => {
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_REMOVE",
  });

  const banLog = fetchedLogs.entries.first();

  if (!banLog) return;

  const { executor, target } = banLog;

  if (executor === client.user) return;

  let reason = banLog.reason;
  if (!reason) reason = "Unspecified";

  if (target.id === user.id) {
    serverLog(user, "UNBAN", executor, reason);
  } else {
    serverLog(user, "UNBAN", "Unknown", "Unknown");
  }
});

//LOGGING
global.serverLog = function (user, type, moderator, reason, time) {
  if (type === "WARN" || type === "KICK" || type === "BAN") {
    if (type === "WARN") (emoji = "❗"), (colour = "FFC24F");
    if (type === "KICK" || type === "BAN") (emoji = "🔒"), (colour = "FF3E3E");

    let banwarnkickEmbed = new Discord.MessageEmbed()
      .setAuthor(`[${emoji} ${type}] ${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .addFields(
        { name: "User", value: user, inline: true },
        { name: "Moderator", value: moderator, inline: true },
        { name: "Reason", value: reason, inline: true }
      );

    serverLogs.send(banwarnkickEmbed);
  } else if (type === "joined") {
    if (type === "joined") (emoji = "📥"), (colour = "33FF5B");

    let joinleaveEmbed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .setDescription(`${emoji} ${user} ${type} the server`)
      .setThumbnail(user.displayAvatarURL());

    serverLogs.send(joinleaveEmbed);
  } else if (type === "left") {
    if (type === "left") (emoji = "📤"), (colour = "FF3E3E");

    let joinleaveEmbed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .setDescription(`${emoji} ${user} ${type} the server`)
      .setThumbnail(user.displayAvatarURL());

    serverLogs.send(joinleaveEmbed);
  } else if (type === "UNBAN") {
    if (type === "UNBAN") (emoji = "🔓"), (colour = "33FF5B");

    let unbanEmbed = new Discord.MessageEmbed()
      .setAuthor(`[${emoji} ${type}] ${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .addFields(
        { name: "User", value: user, inline: true },
        { name: "Moderator", value: moderator, inline: true },
        { name: "Reason", value: reason, inline: true }
      )
      .setThumbnail(user.displayAvatarURL());

    serverLogs.send(unbanEmbed);
  } else if (type === "MUTED") {
    if (type === "MUTED") (emoji = "🔇"), (colour = "FFC24F");

    let mutedEmbed = new Discord.MessageEmbed()
      .setAuthor(`[${emoji} ${type}] ${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .addFields(
        { name: "User", value: user, inline: true },
        { name: "Moderator", value: moderator, inline: true },
        { name: "Reason", value: reason, inline: true },
        { name: "Duration", value: time, inline: true }
      );

    serverLogs.send(mutedEmbed);
  } else if (type === "UNMUTED") {
    if (type === "UNMUTED") (emoji = "🔊"), (colour = "33FF5B");

    let mutedEmbed = new Discord.MessageEmbed()
      .setAuthor(`[${emoji} ${type}] ${user.tag}`, user.displayAvatarURL())
      .setColor(colour)
      .addFields(
        { name: "User", value: user, inline: true },
        { name: "Moderator", value: moderator, inline: true }
      );

    serverLogs.send(mutedEmbed);
  }
};

//MESSAGE FUNCTIONS
client.on("message", async (message) => {
  if (message.channel.type === "dm") return;

  const args = message.content;
  client.functions.get("profanityfilter").execute(message, args, client);
  client.functions.get("acceptchannel").execute(message, args);
  client.functions.get("chatbot").execute(message, args);
  client.functions.get("levels").execute(message, args);
  client.functions.get("room").execute(message, args);
  client.functions.get("trivia").execute(message, args);
});

//TICKET SYSTEM
client.on("messageReactionAdd", async (reaction, user, message, channel) => {
  if (user.partial) await user.fetch();
  if (reaction.partial) await reaction.fetch();
  if (reaction.message.partial) await reaction.message.fetch();
  if (user.bot) return;
  if (reaction.message.channel.type === "dm") return;
  let supportChannel = reaction.message.guild.channels.cache.find(
    (x) => x.name === "👪・support"
  );

  if (reaction.message.channel === supportChannel) {
    reaction.users.remove(user);

    reaction.message.guild.channels
      .create(`support-${user.username}`, {
        permissionOverwrites: [
          {
            id: user.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
          },
          {
            id: reaction.message.guild.roles.everyone,
            deny: ["VIEW_CHANNEL"],
          },
          {
            id: reaction.message.guild.roles.cache.find(
              (role) => role.name === "🔒 Moderators"
            ),
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
          },
        ],
        type: "text",
        parent: serversupportparent,
      })
      .then((ch) => {
        supportIntroMessage = new Discord.MessageEmbed()
          .setTitle("Welcome to Jaden's Empire Support")
          .setDescription(
            "Please provide us with information about what you need help with and a moderator with assist you shortly"
          )
          .setFooter(
            `Jaden's Empire Support`,
            "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
          )
          .setThumbnail("https://i.ibb.co/VS9vhSk/Transparent-Logo.png")
          .setColor("#059DFF");

        ch.send(`${user}`, supportIntroMessage);
      });
  } else {
    return;
  }
});

client.database.init();
client.login(token);
