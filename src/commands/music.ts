import { Command } from "../core/types";

const ytdl = require("ytdl-core-discord");

export const music: Command = {
	name: "music",
	aliases: ["m", "play"],
	description: "Plays stuff from youtube.",
	args: true,
	usage: "<URL>",
	async execute(message, args) {
		if (!message.member) return;

		if (message.member.voice.channel) {
			const connection = await message.member.voice.channel.join();
			const dispatcher = await play(connection, args[0]);

			dispatcher.on("start", () => {
				if (!message.guild) return;
				console.log(`Playing music on ${message.guild.name}`);
			});

			dispatcher.on("finish", async () => {
				if (!message.guild) return;
				await play(connection, args[0]);
				console.log(`Stopped music on ${message.guild.name}`);
			});

			dispatcher.on("error", console.error);
		}
	},
};

async function play(connection: any, url: any) {
	return connection.play(await ytdl(url), { type: "opus" });
}
