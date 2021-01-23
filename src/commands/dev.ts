import Discord = require("discord.js");
import { sendDiceEmbed } from "../core/components/diceroll";
import { Command } from "../core/types";
export const dev: Command = {
	name: "dev",
	description: "Placeholder command for executing functions",
	args: false,
	execute: async (message: Discord.Message, _args: string[]) => {
		const devs = ["Wander#8114"];

		if (!devs.includes(message.author.tag)) {
			return message.channel.send(
				"You're not authorized to use this command."
			);
		}

		sendDiceEmbed(message.channel);
	},
};
