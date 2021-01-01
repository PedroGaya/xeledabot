if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

import fs = require("fs");
import Discord = require("discord.js");
import { Client, Command } from "./core/types";

const prefix = "x/";

const client = new Discord.Client() as Client;
client.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync("./src/commands")
	.filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
	const command: Command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once("ready", async () => {
	console.log("XeledaBot is ready.");
	console.log(`Process started in ${process.env.NODE_ENV} enviroment.`);
});

client.on("message", async (message: Discord.Message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);

	const commandName = (args.shift() ?? "help").toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			(cmd: any) => cmd.aliases && cmd.aliases.includes(commandName)
		);
	if (!command) return;

	if (command.args && !args.length) {
		let reply = `${message.author} Não foram providenciados os parâmetros necessários.`;

		if (command.usage) {
			reply += `\n${message.author} Uso correto: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.channel.send(
			`${message.author} ocorreu um erro na execução desse comando.`
		);
	}
});

client.login(process.env.BOT_TOKEN);
