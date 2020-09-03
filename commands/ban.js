module.exports = {
    name: "ban",
    description: 'ban somebody outta the server',
    execute(message, args) {
        if (message.member.roles.cache.has('743503619281780756' || '743504186498351125')) {
            const member = message.mentions.members.first();
            if (member) {
                member.ban();
                message.channel.send('Bro we banned ' + member.user.username);
            } else {
                message.channel.send('Bruh Mention Somebody to Ban!');
            }
        } else {
            message.channel.send('Bruh You have to be a Moderator/Owner to ban People');
        }
    }
}
