module.exports = {
    name: "kick",
    description: 'kick somebody outta the server',
    execute(message, args) {
        if (message.member.roles.cache.some(r => r.name === "Moderator")) {
            const member = message.mentions.members.first();
            if (member) {
                member.kick()
                message.channel.send('***We***  kicked ' + member.user.username);
            } else {
                message.channel.send('Bruh Mention Somebody');
            }
        } else {
            message.channel.send('Bruh You have to be get a role named "Moderator" to ban People');
        }
    }
}
