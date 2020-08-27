module.exports = {
    name: "say",
    description: 'Say Something',
    execute(message, args) {
        if (args == '') return message.channel.send('Bruh do you really want me to say Something?');
        message.channel.send(args.join(' '));
    }
}
