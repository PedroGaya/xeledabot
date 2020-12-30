if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const fs = require("fs");
const Discord = require("discord.js");
const config = require("../config.json");
const helper = require("./core/helper.js");

const prefix = config.prefix;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", async () => {
  console.log("XeledaBot is ready.");
  console.log(`Process started in ${process.env.NODE_ENV} enviroment.`)
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
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
    message.channel.send(`${message.author} ocorreu um erro na execução desse comando.`);
  }
});

client.login(process.env.BOT_TOKEN);
