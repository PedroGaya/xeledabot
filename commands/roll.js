const helper = require("../helper.js")

module.exports = {
    name: 'corno',
    aliases: ['r'],
    description: 'Rolls any set of dice witht the format XdY',
    usage: '<XdY> + <XdY> + ...',
    args: true,
	async execute(message, args) {
        const regex = /(\d*d\d+)|([*+)(-/])|(\d+)/g
        const parsed = args.join("").match(regex)
        return message.channel.send(`${message.author}: \`(${parsed.join("")})\` = ${helper.evalRoll(parsed)}`)
	},
};