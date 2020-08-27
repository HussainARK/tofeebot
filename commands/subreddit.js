module.exports = {
    name: "subreddit",
    description: 'Send OUR Subreddit URL',
    execute(message, args) {
        message.channel.send('https://reddit.com/r/Tofee');
    }
}