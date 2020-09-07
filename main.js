require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

const client = new Discord.Client();

const prefix = "t/";

let servers = {};

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("TofeeBot is Online!");
  client.user.setPresence({
    status: "online",
    activity: {
      name: "t/help",
      type: "WATCHING",
    },
  });
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    const embed = new Discord.MessageEmbed().setTitle("Help").setColor(0x00ceff)
      .setDescription(`These are commands that you can use:\n
***Fun*** :
    **t/wel** - Welcome a New Members
    **t/say {something}** - Say Something
    **t/ask {question}** - It'll answer
    **t/poll {question}** - Make a Poll!

***Management*** :
    **t/kick {@somebody}** - Kick Somebody (Owner/Moderator Use Only)
    **t/ban {@somebody}** - Ban Somebody (Owner/Moderator Use Only)

***Other***:
    **t/subreddit** - Send you ***OUR***  Subreddit Link
    **t/partners** - Send you ***OUR***  Partner Servers Invite Link
    **t/youtube** - Send you the Owner's YT Channel Link
    **t/twitter** - Send you the Owner's Twitter Link
    **t/reddit** - Send you the Owner's Reddit Link`);

  message.channel.send(embed);
  } else if (command == "youtube") {
    client.commands.get("youtube").execute(message, args);
  } else if (command == "kick") {
    client.commands.get("kick").execute(message, args);
  } else if (command == "ban") {
    client.commands.get("ban").execute(message, args);
  } else if (command == "twitter") {
    client.commands.get("twitter").execute(message, args);
  } else if (command == "ask") {
    client.commands.get("ask").execute(message, args);
  } else if (command == "wel") {
    const welcomeEmbed = new Discord.MessageEmbed().setTitle("Welcome!").setColor(0x00ceff).setDescription(
`Welcome to **Tofee Hub**!
Have a Great Time! Hope You Enjoy!`
    ).setAuthor('Tofee Bot', 'https://media.discordapp.net/attachments/651353636823105539/751437841954766938/Logo.gif');
    message.channel.send(welcomeEmbed);
  } else if (command == "partners") {
    const anotherEmbed = new Discord.MessageEmbed()
      .setTitle("Tofee Hub's Partners")
      .setColor(0x6895ff).setDescription(`**1. Gamers Community**:
https://discord.gg/2m9NPb

**2. Melon Hub**:
https://discord.gg/pEr3q5F

**3. Chilled Gaming**:
https://discord.gg/NReVszv

**4. The Differix Fort**:
https://discord.gg/YRdS4EM

**5. a crumb of seretonin pls**:
https://discord.gg/t6Vu9E5

**6. cv's bakery**:
https://discord.gg/6vURWhh

**7. gb**:
https://discord.gg/9bEZDUB

**8. The House**:
https://discord.gg/x5XAc64
`);

  message.channel.send(anotherEmbed);
  } else if (command == "say") {
    client.commands.get("say").execute(message, args);
  } else if (command == "reddit") {
    client.commands.get("reddit").execute(message, args);
  } else if (command == "subreddit") {
    client.commands.get("subreddit").execute(message, args);
  } else if (command == "hey") {
    client.commands.get("hello").execute(message, args);
  } else if (command == "poll") {
    if (!args[0]) return message.channel.send("Really Bruh");
    else {
      const pollEmbed = new Discord.MessageEmbed()
        .setTitle(args.join(" "))
        .setColor(0x6895ff);
      message.channel.send(pollEmbed).then((messageReaction) => {
        messageReaction.react("👍");
        messageReaction.react("👎");
      });
    }
  } else {
    message.channel.send("Bruh what did you say?");
  }
});

client.login(process.env.TOKEN);
