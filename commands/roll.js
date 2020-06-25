const helper = require("../helper.js")

module.exports = {
    name: 'roll',
    aliases: ['r'],
    description: 'Rolls any set of dice with the format XdY',
    usage: '<XdY> + 10 + ...',
    args: true,
	async execute(message, args) {
        const regex = /(\d*d\d+)|([*+)(-/])|(\d+)/g
        const parsed = args.join("").match(regex)
        return message.channel.send(`${message.author}: \`(${parsed.join("")})\` = ${helper.evalRoll(parsed)}`)
	},
};