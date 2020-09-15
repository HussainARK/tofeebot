module.exports = {
    name: "ban",
    description: 'ban somebody in server',
    execute(message, args) {
        if (message.member.roles.cache.some(r => r.name === "Moderator")) {
            const member = message.mentions.members.first();
            if (member) {
                member.ban();
                message.channel.send('***We***  banned ' + member.user.username);
            } else {
                message.channel.send('Bruh Mention Somebody to Ban!');
            }
        } else {
            message.channel.send('Bruh You have to be get a role named "Moderator" to ban People');
        }
    }
}
