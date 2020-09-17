module.exports = {
    name: "kick",
    description: 'kick somebody outta the server',
    execute(message, args) {
        if (message.member.hasPermission(['KICK_MEMBERS'])) {
            const member = message.mentions.members.first();
            if (member) {
                member.kick()
                message.channel.send('***We***  kicked ' + member.user.username);
            } else {
                message.channel.send('Bruh Mention Somebody');
            }
        } else {
            message.channel.send("YOU DON'T HAVE PERMS TO KICK LMFAO");
        }
    }
}
