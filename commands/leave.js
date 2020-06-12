module.exports = {
  name: "leave",
  description: "Leaves the current voice channel, if connected.",
  args: false,
  async execute(message, args) {
    const voiceChannel = message.guild.me.voice.channel;

    if (voiceChannel) {
        voiceChannel.leave()
        console.log(`Left SKR voice channel.`)
    } else {
        message.channel.send(`${message.author} I'm not in a voice channel.`)
    }
  },
};