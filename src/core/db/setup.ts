import Discord = require("discord.js");
import { Dice, DiceSheet } from "../types";

const options = {
	time: 120000,
	max: 1,
	errors: ["time"],
};

export const create_sheet = async (message: Discord.Message) => {
	var sheet: DiceSheet = {
		name: "",
		owner: "",
		rolls: [],
	};
	const filter = (m: Discord.Message) => message.author.id === m.author.id;

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

export const setup_game = async (message: Discord.Message) => {
	const filter = (m: Discord.Message) => message.author.id === m.author.id;

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
