const helper = require("../core/helper.js")

module.exports = {
    name: 'roll',
    aliases: ['r'],
    description: 'Rolls any set of dice with the format XdY',
    usage: '<XdY> + 10 + ...',
    args: true,
	async execute(message, args) {
        const regex = /(\d*d\d+)|([*+)(-/])|(\d+)/g
        const parsed = args.join("").match(regex)
        const result = helper.evalRoll(parsed)

        return message.channel.send(`${message.author}: \`${result}\` = ${eval(result)}`)
	},
};