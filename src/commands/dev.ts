import Discord = require("discord.js");
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

		const myEmbed = new Discord.MessageEmbed()
			.setURL("http://localhost:3000")
			.setTitle("my link");

		message.channel.send(myEmbed);
	},
};
