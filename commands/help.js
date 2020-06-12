const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
  name: "help",
  description: "Lista os comandos do bot, ou um comando específico.",
  usage: `<comando>`,
  args: false,
  execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Comandos:");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\nEnvie \`${prefix}help [command name]\` para mais informações.`
      );

      return message.channel.send(data, { split: true });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name);

    if (!command) {
      return message.reply("Esse comando não existe.");
    }

    data.push(`**Nome:** ${command.name}`);

    if (command.description)
      data.push(`**Descrição:** ${command.description}`);
    if (command.usage)
      data.push(`**Uso:** \`${prefix}${command.name} ${command.usage}\``);

    message.channel.send(data, { split: true });
  },
};
