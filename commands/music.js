const fs = require('fs')
const ytdl = require('ytdl-core-discord');

module.exports = {
  name: "music",
  aliases: ['m', 'play'],
  description: "Plays stuff from youtube.",
  args: true,
  usage: "<URL>",
  async execute(message, args) {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = await play(connection, args[0]);
      
      dispatcher.on("start", () => {
        console.log(`Playing music on ${message.guild.name}`);
      });

      dispatcher.on("finish", () => {
        console.log(`Stopped music on ${message.guild.name}`);
      });

      dispatcher.on("error", console.error);
    }
  },
};

async function play(connection, url) {
	return connection.play(await ytdl(url, { highWaterMark: 1<<25 }), { type: 'opus' });
}
