import Discord = require("discord.js");
import { Command } from "../core/types";
export const dev: Command = {
	name: "dev",
	description: "Placeholder command for executing functions",
	args: false,
	execute: async (message: Discord.Message, _args: string[]) => {
		var author = message.author;

		var reply = `${author} sent this request`;
		message.channel.send(`DEV: ${reply}`);
	},
};
