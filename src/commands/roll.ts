import { evalRoll } from "../core/helper";
import { Command } from "../core/types";

export const roll: Command = {
	name: "roll",
	aliases: ["r"],
	description: "Rolls any set of dice with the format XdY",
	usage: "<XdY> + 10 + ...",
	args: true,
	async execute(message, args) {
		const regex = /(\d*d\d+)|([*+)(-/])|(\d+)/g;
		const parsed = args.join("").match(regex);
		if (!parsed) return;
		const result = evalRoll(parsed);

		return message.channel.send(
			`${message.author}: \`${result}\` = ${eval(result)}`
		);
	},
};
