const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

const { clientId, clientSecret, token } = config.auth;
const prefix = config.prefix

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase();

  if (command == 'help') {message.channel.send(`You sent the command: ${command}\nArguments: ${args}`)}

});

client.login(token);
