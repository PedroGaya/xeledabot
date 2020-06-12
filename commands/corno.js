module.exports = {
	name: 'corno',
    description: 'Feito para testar a funcionalidade do bot.',
    args: false,
	async execute(message, args) {
        var author = message.author;

        console.log(`Corno received in ${message.guild.name}, sent by ${message.author.username}`)
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