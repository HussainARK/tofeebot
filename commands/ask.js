module.exports = {
    name: "ask",
    description: 'ask for something',
    execute(message, args) {
        message.channel.send("I don't know, Ask your Mama" || 
                            "Yes, That's a Fact" || 
                            "Probably No??" || 
                            "No!" || 
                            "YES!" ||
                            `Don't ask Me that Question!`,
                            'Sadly, No',
                            'Sadly, Yes',
                            "I don't have Enough Time to answer This");
    }
}
