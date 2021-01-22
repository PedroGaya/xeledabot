import Discord = require("discord.js");
import { create_sheet, setup_game } from "../core/db/setup";
import { Command, Game } from "../core/types";

const description = `
This will start a wizard to help you setup a game.

Once you're done setting up, you can edit your game with the \`x/edit\` command.
`;

export const setup: Command = {
	name: "setup",
	description: description,
	args: false,
	aliases: ["stp"],
	execute: async (message: Discord.Message, _args: string[]) => {
		await message.channel.send(
			"I'm here to help you setup a game and some sheets to start. "
		);

		const game_name = await setup_game(message);

		const notice = `
		Dice sheets work by storing either rolls or outright values.
		Whatever you input to a stored roll will be rolled when you ask for it.
		Rolls have to be in Standard Dice Notation (any combination of AdX+B).
		Regular numbers can also be stored and will be returned when the "roll" is asked for.
	
		Additionally, only you and whomever you assign as owner of the sheet will be able to edit it.
		This can be done at any time with the \`x/edit\` command.
		`;

		await message.channel.send(notice);

		const sheet = await create_sheet(message);

		var game: Game = {
			name: game_name ?? "error",
			sheets: [sheet],
		};

		console.log(game);
	},
};
