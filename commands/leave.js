module.exports = {
  name: "leave",
  description: "Sai do voice channel, se estiver conectado.",
  args: false,
  async execute(message, args) {
    const voiceChannel = message.guild.me.voice.channel;

    if (voiceChannel) {
        voiceChannel.leave()
    } else {
        message.channel.send(`${message.author} Não estou em um canal de voz.`)
    }
  },
};