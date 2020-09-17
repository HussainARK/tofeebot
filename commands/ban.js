module.exports = {
    name: "ban",
    description: 'ban somebody in server',
    execute(message, args) {
        if (message.member.hasPermission(['BAN_MEMBERS'])) {
            const member = message.mentions.members.first();
            if (member) {
                member.ban();
                message.channel.send('***We***  banned ' + member.user.username);
            } else {
                message.channel.send('Bruh Mention Somebody to Ban!');
            }
        } else {
            message.channel.send("How dare you, You wanna ban members without having Permission to do that?");
        }
    }
}
