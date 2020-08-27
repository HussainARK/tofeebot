module.exports = {
    name: "hello",
    description: 'hello?',
    execute(message, args) {
        message.channel.send('Hey!');
    }
}
