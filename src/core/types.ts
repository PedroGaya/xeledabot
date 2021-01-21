import Discord = require("discord.js");

export type myClient = Discord.Client & {
	commands: Discord.Collection<string, Command>;
};

export type Command = {
	name: string;
	aliases?: string[];
	description: string;
	usage?: string;
	args: boolean;
	execute: (message: Discord.Message, args: string[]) => Promise<any> | void;
};

export type Game = {
	name: string;
	sheets: DiceSheet[];
};

export type DiceSheet = {
	name: string;
	owner: string;
	rolls: Dice[];
};

export type Dice = {
	name: string;
	dice: string;
};
