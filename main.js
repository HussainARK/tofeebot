require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

// yts('ussr anthem').then(data => console.log(data))

const client = new Discord.Client();

const prefix = "t/";

const servers = {};

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
  	**t/say {something}** - Say Something
	  **t/ask {question}** - It'll answer
  	**t/poll {question}** - Make a Poll!

***Music*** *(In Development)* :
		**t/play {song}** - Plays a Song or Add a New One to the Queue
		**t/skip** - Skip the Current Song
    **t/leave** - Leaves the Voice Channel

***Management*** :
    **t/kick {@somebody}** - Kick Somebody {Owner/Moderator}

***Pages***:
    **t/subreddit** - Send you ***OUR***  Subreddit Link
    **t/partners** - Send you ***OUR***  Partner Servers Invite Link
    **t/youtube** - Send you the Owner's YT Channel Link
  	**t/twitter** - Send you the Owner's Twitter Link
  	**t/reddit** - Send you the Owner's Reddit Link 
`);

	message.channel.send(embed);
	} else if (command == "youtube") {
		client.commands.get("youtube").execute(message, args);
	} else if (command == "kick") {
		client.commands.get("kick").execute(message, args);
	} else if (command == "twitter") {
		client.commands.get("twitter").execute(message, args);
	} else if (command == "ask") {
		client.commands.get("ask").execute(message, args);
	} else if (command == "partners") {
		const anotherEmbed = new Discord.MessageEmbed()
			.setTitle("Tofee Hub's Partners")
			.setColor(0x6895ff).setDescription(`**1. Gamers Community**:
https://discord.gg/2m9NPb

**2. Melon Hub**:
https://discord.gg/pEr3q5F

**3. Chilled Gaming**:
https://discord.gg/NReVszv`);

	message.channel.send(anotherEmbed);
	} else if (command == "say") {
		client.commands.get("say").execute(message, args);
	} else if (command == "reddit") {
		client.commands.get("reddit").execute(message, args);
	} else if (command == "subreddit") {
		client.commands.get("subreddit").execute(message, args);
	} else if (command == "hey") {
		client.commands.get("hello").execute(message, args);
	} else if (command == "play") {
		if (!args[0])
			return message.channel.send(
				"[Softly] Can you tell me wtf should I play?"
			);
		else {
			if (!message.member.voice.channel) {
				return message.channel.send(
					"Where the f*** should I play Music? PLEASE ENTER A VOICE CHANNEL"
				);
			}

			const play = (connection, message) => {
				const server = servers[message.guild.id];
				yts(server.queue[0]).then(result => {
					server.dispatcher = connection.play(ytdl(result.videos[0].url, {filter: 'audioonly'}));

					server.queue.shift();

					server.dispatcher.on('end', () => {
						if (server.queue[0]) {
							play(connection, message)
						} else {
							connection.disconnect();
						}
					});
				}).catch(err => console.log(err));
			};

			if (!servers[message.guild.id])
				servers[message.guild.id] = {
					queue: [],
				};

			const server = servers[message.guild.id];

			server.queue.push(args[0]);

			if (!message.member.voice.connection) {
				message.member.voice.channel.join().then(connection => {
					play(connection, message);
				});
			}
		}
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
