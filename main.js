require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = "t/"

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('TofeeBot is Online!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

	if (command === 'help') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Help')
        .setColor(0x00ceff)
        .setDescription(`These are commands that you can use:\n
**t/help** - Send this Message
**t/say {something}** - Say Something
**t/kick {@somebody}** - Kick Somebody
**t/subreddit** - Send you ***OUR***  Subreddit Link
**t/youtube** - Send you the Owner's YT Channel Link
**t/twitter** - Send you the Owner's Twitter Link
**t/reddit** - Send you the Owner's Reddit Link        
        `);

    message.channel.send(embed);
	} else if (command == 'youtube') {
		client.commands.get('youtube').execute(message, args);
	} else if (command == 'kick') {
		client.commands.get('kick').execute(message, args);
	} else if (command == 'twitter') {
		client.commands.get('twitter').execute(message, args);
	} else if (command == 'say') {
        client.commands.get('say').execute(message, args);
	} else if (command == 'reddit') {
		client.commands.get('reddit').execute(message, args);
	} else if (command == 'subreddit') {
		client.commands.get('subreddit').execute(message, args);
	} else if (command == 'hello') {
        client.commands.get('hello').execute(message, args);
    } else {
		message.channel.send('Bruh what did you say?');
	}
});

client.login(process.env.TOKEN);
