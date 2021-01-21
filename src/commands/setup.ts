import Discord = require("discord.js");
import { Command, Dice, DiceSheet, Game } from "../core/types";

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
		const filter = (m: Discord.Message) =>
			message.author.id === m.author.id;

		const options = {
			time: 120000,
			max: 1,
			errors: ["time"],
		};

		await message.channel.send(
			"I'm here to help you setup a game and some sheets to start. "
		);

		const game_name = await setup_game(message, filter, options);
		const sheet = await create_sheet(message, filter, options);

		var game: Game = {
			name: game_name ?? "error",
			sheets: [sheet],
		};

		console.log(game);
	},
};

const setup_game = async (
	message: Discord.Message,
	filter: any,
	options: any
) => {
	do {
		var game_name;
		var confirmed;

		await message.channel.send("Give your game a name: ").then(async () => {
			await message.channel.awaitMessages(filter, options).then((m) => {
				const curr_name = m.first()?.content;

				if (!curr_name) {
					throw "You didn't input a valid name!";
				}

				game_name = curr_name;
			});
		});

		await message.channel
			.send(`Are you sure about this name? (y/n)`)
			.then(async () => {
				await message.channel
					.awaitMessages(filter, options)
					.then((m) => {
						const answer = m.first()?.content ?? "n";

						confirmed = ["y", "yes", "ye", "ys"].includes(
							answer.toLowerCase()
						);
					});
			});

		if (confirmed) {
			return game_name;
		}
	} while (!confirmed);
};

const create_sheet = async (
	message: Discord.Message,
	filter: any,
	options: any
) => {
	const notice = `
	Dice sheets work by storing either rolls or outright values.
	Whatever you input to a stored roll will be rolled when you ask for it.
	Rolls have to be in Standard Dice Notation (any combination of AdX+B).
	Regular numbers can also be stored and will be returned when the "roll" is asked for.

	Additionally, only you and whomever you assign as owner of the sheet will be able to edit it.
	This can be done at any time with the \`x/edit\` command.
	`;

	await message.channel.send(notice);

	var sheet: DiceSheet = {
		name: "",
		owner: "",
		rolls: [],
	};

	await message.channel.send("Give this sheet a name: ").then(async () => {
		await message.channel.awaitMessages(filter, options).then((m) => {
			const curr_name = m.first()?.content;

			if (!curr_name) {
				throw "You didn't input a valid name!";
			}

			sheet.name = curr_name;
		});
	});

	await message.channel
		.send("Who is this sheet's owner? (This has to be a discord tag.)")
		.then(async () => {
			await message.channel.awaitMessages(filter, options).then((m) => {
				const curr = m.first()?.content;

				if (!curr) {
					throw "You didn't input a valid tag!";
				}

				sheet.owner = curr;
			});
		});

	await message.channel.send("Now let's add a roll");

	var not_done = true;
	do {
		var roll: Dice = { name: "", dice: "" };

		await message.channel.send("What's its name?").then(async () => {
			await message.channel.awaitMessages(filter, options).then((m) => {
				const curr = m.first()?.content;

				if (!curr) {
					throw "You didn't input a valid roll name!";
				}

				roll.name = curr;
			});
		});

		await message.channel
			.send(
				"Now, type the roll. Remember to use the same syntax `roll` command."
			)
			.then(async () => {
				await message.channel
					.awaitMessages(filter, options)
					.then((m) => {
						const curr = m.first()?.content;

						if (!curr) {
							throw "You didn't input a valid roll!";
						}

						roll.dice = curr;
					});
			});

		sheet.rolls.push(roll);

		await message.channel
			.send(`Would you like to add another roll? (y/n)`)
			.then(async () => {
				await message.channel
					.awaitMessages(filter, options)
					.then((m) => {
						const answer = m.first()?.content ?? "n";

						not_done = ["y", "yes", "ye", "ys"].includes(
							answer.toLowerCase()
						);
					});
			});
	} while (not_done);

	return sheet;
};
