const randomPuppy = require('random-puppy');
const snekfetch = require('snekfetch');

module.exports = {
	name: "meme",
	description: 'Send a Meme lmao',
	execute(message, args) {
		const subreddits = [
            "AdviceAnimals",
            "MemeEconomy",
            "ComedyCemetery",
            "memes",
            "dankmemes",
            "meme",
            "dankmeme",
            "meirl",
            "me_irl",
            "PrequelMemes",
            "terriblefacebookmemes",
            "PewdiepieSubmissions",
            "Tofee"
        ];
        
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

        message.channel.startTyping();
        
        randomPuppy(subreddit).then(url => {
            snekfetch.get(url).then(async res => {
                await message.channel.send({
                    files: [{
                        attachments: res.body,
                        name: "meme.png"
                    }]
                }).then(() => message.channel.stopTyping());
            }).catch(err => console.error(err));
        }).catch(err => console.error(err));
	}
}
