const helper = require("../helper.js")

module.exports = {
    name: 'corno',
    aliases: ['r'],
    description: 'Rolls any set of dice witht the format XdY',
    usage: '<XdY> + <XdY> + ...',
    args: true,
	async execute(message, args) {
        console.log(args)
        return message.channel.send(`${message.author}: \`(${args.join("")})\` = ${helper.evalRoll(args)}`)
	},
};