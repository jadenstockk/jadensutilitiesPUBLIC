module.exports = {
  name: "covid",
  description: "Track a country or worldwide COVID-19 cases",

  execute(message, args) {
    const Discord = require("discord.js");
    const fetch = require("node-fetch");

    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
      .setTitle("You didn't provide a country")
      .setColor(0xff0000)
      .setDescription(
        "Try mentioning the country that you want to get stats for"
      )
      .setFooter(
        'e.g. "!covid world" or "!covid South Africa"',
        "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
      )
      .setThumbnail(
        `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/110px-SARS-CoV-2_without_background.png`
      )
      .setTimestamp();

    const invlaidCountry = new Discord.MessageEmbed()
      .setTitle("The country you provided is invalid")
      .setColor(0xff0000)
      .setFooter('e.g. "!covid world" or "!covid South Africa"')
      .setThumbnail(
        `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/110px-SARS-CoV-2_without_background.png`
      )
      .setTimestamp();
    if (!args[0]) return message.channel.send(noArgs);

    if (args[0] === "world") {
      fetch(`https://covid19.mathdro.id/api`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Stats 🌎`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths)
            .setColor("#059DFF")
            .setFooter(
              `Jaden's Empire Covid-19 Stats`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )
            .setThumbnail(
              `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/110px-SARS-CoV-2_without_background.png`
            )
            .setTimestamp();

          message.channel.send(embed);
        });
    } else {
      fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
        .then((response) => response.json())
        .then((data) => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`COVID-19 Stats for **${countries}**`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths)
            .setColor("#059DFF")
            .setFooter(
              `Jaden's Empire Covid-19 Stats`,
              "https://i.ibb.co/VS9vhSk/Transparent-Logo.png"
            )
            .setThumbnail(
              `https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/SARS-CoV-2_without_background.png/110px-SARS-CoV-2_without_background.png`
            )
            .setTimestamp();

          message.channel.send(embed);
        })
        .catch((e) => {
          return message.channel.send(invlaidCountry);
        });
    }
  },
};
