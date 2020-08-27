// I'm not using this file

module.exports = {
    name: "help",
    description: 'Helping the User to get info about the bot',
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Help')
        .setColor(0xff0000)
        .setDescription(`Hello, These are commands that you can use:
t/help - Send this Message
t/say {something} - Say Something
t/subreddit - Send you ***OUR***  Subreddit Link
t/youtube - Send you the Owner's YT Channel Link
t/twitter - Send you the Owner's Twitter Link
t/reddit - Send you the Owner's Reddit Link        
        `);

    message.channel.send(embed);
        message.channel.send(embed);
    }
}
