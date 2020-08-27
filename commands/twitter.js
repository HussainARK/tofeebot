module.exports = {
    name: "twitter",
    description: 'Send the Owner Twitter URL',
    execute(message, args) {
        message.channel.send('https://twitter.com/RealTofee');
    }
}
