require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();

const prefix = "t/";

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
  if (message.author.bot) return;

  if (message.mentions.members.first()) {
    if (message.mentions.members.first().id === "748435354398359602") {
      message.channel.send("btw My Prefix is `t/`");
    }
  }
  
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    const embed = new Discord.MessageEmbed().setTitle("Help").setColor(0x00ceff)
      .setDescription(`My Prefix is \`t/\`, You can't change it lmao.
These are commands that you can use:\n
***Fun*** :
    **t/wel** - Welcome New Members to the Server!
    **t/ask {yes/no question}** - It'll answer
    **t/poll {question}** - Make a Poll!

***Moderation***:
    **t/kick {@somebody}** - Kick Somebody
    **t/ban {@somebody}** - Ban Somebody

***Other***:
    **t/source** - Get the GitHub Page of this Open-Source Discord Bot!
    **t/invite** - Invite Tofee Bot to Other Servers

    ***DM Me to improve the Bot***`).setFooter('Made By Tofee#9999');

  message.channel.send(embed);
  } else if (command == "kick") {
    client.commands.get("kick").execute(message, args);
  } else if (command == "ban") {
    client.commands.get("ban").execute(message, args);
  } else if (command == "ask") {
    client.commands.get("ask").execute(message, args);
  } else if (command == "invite") {
    message.channel.send('Invite Me lmao https://discord.com/oauth2/authorize?client_id=748435354398359602&scope=bot');
  } else if (command == "wel") {
    const welcomeEmbed = new Discord.MessageEmbed().setTitle("Welcome!").setColor(0x00ceff).setDescription(
`Welcome to **${message.guild.name}**!
Have a Great Time! Hope You Enjoy!`
    ).setFooter('Made By Tofee#9999');
    
    message.channel.send(welcomeEmbed);
  // } else if (command == "say") {
  //   client.commands.get("say").execute(message, args);
  } else if (command == "hello") {
    client.commands.get("hello").execute(message, args);
  // } else if (command == "meme") {
    // client.commands.get("meme").execute(message, args);
  } else if (command == "source") {
    client.commands.get("source").execute(message, args);
  } else if (command == "poll") {
    if (!args[0]) return message.channel.send("Really Bruh");
    else {
      const pollText = args.join(" ");
      
      if (pollText.length > 50) return message.channel.send("that's too much lmfao");
      
      const pollEmbed = new Discord.MessageEmbed()
        .setTitle("📝 " + pollText)
        .setColor(0x6895ff).setFooter('Made By Tofee#9999');
      message.channel.send(pollEmbed).then((messageReaction) => {
        messageReaction.react("👍");
        messageReaction.react("👎");
      });
    }
  } else {
    message.channel.send("Bruh what did you say? this command doesn't exist lol");
  }
});

client.login(process.env.TOKEN);
