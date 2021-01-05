import { Command } from "../core/types";

export const leave: Command = {
	name: "leave",
	aliases: ["l"],
	description: "Leaves the current voice channel, if connected.",
	args: false,
	async execute(message, _args) {
		if (message.guild === null) return;
		if (message.guild.me === null) return;

		const voiceChannel = message.guild.me.voice.channel;

		if (voiceChannel) {
			voiceChannel.leave();
		} else {
			message.channel.send(
				`${message.author} I'm not in a voice channel.`
			);
		}
	},
};
