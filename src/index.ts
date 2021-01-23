var loginToken;
const isDev = process.env.NODE_ENV !== "production";
if (isDev) {
	require("dotenv").config();
	loginToken = process.env.DEV_BOT_TOKEN;
} else {
	loginToken = process.env.PROD_BOT_TOKEN;
}

import fs = require("fs");
import Discord = require("discord.js");
import { Command, myClient } from "./core/types";

const prefix = "x/";

const client = new Discord.Client({
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
}) as myClient;
client.commands = new Discord.Collection();

process.stdout.write("Loading commands...");

const commandFiles = fs
	.readdirSync("./src/commands")
	.filter((file) =>
		file.endsWith(".ts") && isDev ? true : !file.startsWith("dev")
	)
	.map((file) => file.replace(".ts", ""));

for (const file of commandFiles) {
	import(`./commands/${file}`).then((result) => {
		const cmd: Command = result[file];
		client.commands.set(cmd.name, cmd);
	});
}

process.stdout.write("	Done!\n");

client.once("ready", async () => {
	console.log("DMBot is ready.");
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

client.on("messageReactionAdd", async (reaction, _user) => {
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.error(
				"Something went wrong when fetching the message: ",
				error
			);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(
		`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
	);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(
		`${reaction.count} user(s) have given the same reaction to this message!`
	);
});

client.login(loginToken);
