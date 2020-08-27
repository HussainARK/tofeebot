module.exports = {
    name: "reddit",
    description: 'Send the Owner Reddit URL',
    execute(message, args) {
        message.channel.send('https://reddit.com/u/HussainARK');
    }
}