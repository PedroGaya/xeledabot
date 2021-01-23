import Discord = require("discord.js");
import { DiceSheet } from "../types";

const array = [
	{
		name: "field 1",
		value: "Some value here",
		inline: true,
	},
	{
		name: "field 2",
		value: "Some value here",
		inline: true,
	},
	{
		name: "\u200b",
		value: "\u200b",
		inline: true,
	},
	{
		name: "field 4",
		value: "Some value here",
		inline: true,
	},
];

export const SheetEmbed = (_sheet?: DiceSheet) => {
	return new Discord.MessageEmbed()
		.setTitle("Your sheet")
		.setThumbnail("https://i.imgur.com/wSTFkRM.png")
		.addFields(array)
		.setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");
};
