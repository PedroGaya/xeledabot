import Discord = require("discord.js");
import { Dice, myChannel } from "../types";

export const DiceEmbed = (_sheet?: Dice) => {
	return new Discord.MessageEmbed()
		.setTitle("Roll name")
		.setDescription(`[test](http://google.com)`);
};

export const sendDiceEmbed = async (channel: myChannel, dice?: Dice) => {
	const embed = DiceEmbed(dice);

	const message = await channel.send(embed);

	message.react("🎲");

	const filter = (reaction: any, user: any) => {
		return reaction.emoji.name === "🎲" && user.id !== message.author.id;
	};

	return message
		.awaitReactions(filter, { max: 1, errors: ["max"] })
		.then((collected) => {
			const reaction = collected.first();

			if (!reaction) throw "Error while receiving reaction";

			if (reaction.emoji.name === "🎲") {
				message.channel.send("Rolled some number");
			}
		});
};
