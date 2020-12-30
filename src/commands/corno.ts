module.exports = {
	name: 'corno',
    description: 'Made to test the bots\' basic functions',
    args: false,
	async execute(message, args) {
        var author = message.author;

        if (author.username !== 'Wander') {message.channel.send(`${author} ${getCorno()}`);}
        else {message.channel.send(`${author} não é corno`);}
	},
};

function getCorno() {
    var random = Math.random() * 2
    if (Math.ceil(random) == 2) {
        return 'é corno.'
    }
    else {return 'não é corno.'}
}