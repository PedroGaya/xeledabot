import Discord = require("discord.js");

export type Client = Discord.Client & {
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
