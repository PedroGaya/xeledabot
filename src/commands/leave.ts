module.exports = {
  name: "leave",
  aliases: ["l"],
  description: "Leaves the current voice channel, if connected.",
  args: false,
  async execute(message, args) {
    const voiceChannel = message.guild.me.voice.channel;

    if (voiceChannel) {
        voiceChannel.leave()
    } else {
        message.channel.send(`${message.author} I'm not in a voice channel.`)
    }
  },
};