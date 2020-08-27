module.exports = {
    name: "ask",
    description: 'ask for something',
    execute(message, args) {
        const answers = [
            "I don't know, Ask your Mama",
            "Yes, That's a Fact",
            "Probably No??",
            "No!",
            "YES!",
            `Don't ask Me that Question!`,
            'Sadly, No',
            'Sadly, Yes',
            "I don't have Enough Time to answer This",
            "Sorry but this is a Hard Question"
        ]

        message.channel.send(answers[Math.floor(Math.random()*items.length)]);
    }
}
