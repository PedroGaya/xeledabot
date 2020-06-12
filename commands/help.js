const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
  name: "help",
  description: "Lists available commands, or details about specific ones.",
  usage: `<command>`,
  args: false,
  async execute(message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Commands:");
      data.push(commands.map((command) => command.name).join(", "));
      data.push(
        `\nSend \`${prefix}help <command>\` for more information.`
      );

      return message.channel.send(data, { split: true });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name);

    if (!command) {
      return message.reply("This command doesn't exist");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** \`${prefix}${command.name} ${command.usage}\``);

    message.channel.send(data, { split: true });
  },
};
