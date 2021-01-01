import Discord = require("discord.js");
import { Command } from "../core/types";

export const corno: Command = {
	name: "corno",
	description: "Made to test the bot's basic functions",
	args: false,
	execute: async (message: Discord.Message, _args: string[]) => {
		var author = message.author;

		if (author.username !== "Wander") {
			message.channel.send(`${author} ${getCorno()}`);
		} else {
			message.channel.send(`${author} não é corno`);
		}
	},
};

function getCorno() {
	var random = Math.random() * 2;
	if (Math.ceil(random) == 2) {
		return "é corno.";
	} else {
		return "não é corno.";
	}
}
