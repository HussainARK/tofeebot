module.exports = {
    name: "youtube",
    description: 'Send the Owner YT Channel URL',
    execute(message, args) {
        message.channel.send('https://www.youtube.com/channel/UCCZJQoUIK7nLDAuYpD6ZXWw/');
    }
}
