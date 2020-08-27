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
            "Sorry but this is a Hard Question",
            "I don't think So,",
            "I'm Bored, I can't even answer",
            "***BRUH***",
            "I'll pretend that I didn't read that",
            "Hey <@&743503619281780756>! Look at what This Guy asked!",
        ]

        message.channel.send(answers[Math.floor(Math.random()*answers.length)]);
    }
}
