module.exports = {
    name: "say",
    description: 'Say Something',
    execute(message, args) {
        if (args == '') return message.channel.send('Bruh do you really want me to say Something? ENTER SOME TEXT AFTER THE COMMAND');
        message.channel.send(args.join(' '));
    }
}
