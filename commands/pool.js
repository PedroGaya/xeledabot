const data = require("../core/cache.js");
const helper = require("../core/helper.js");

module.exports = {
  name: "pool",
  aliases: ["p"],
  description: "Rolls a pre-set pool of dice.",
  usage: "<name>",
  args: true,
  async execute(message, args) {
    const cache = data.get();

    if (args[0] === "register") {
      const poolName = args[1];
      const rolls = args.slice(2);

      var parsedRolls = [];
      rolls.forEach((element) => {
        parsedRolls.push(poolParser(element));
      });

      var pool = {
        name: poolName,
        rolls: parsedRolls,
      };

      if (!cache.hasOwnProperty("pools")) {
        data.add({ pools: [pool] });
      } else {
        cache.pools.push(pool);
      }

      console.log(data.get());
    } else {
      const response = [];

      const poolTarget = args[0];
      const myPool = cache.pools.filter((pool) => pool.name === poolTarget)[0];

      const { name, rolls } = myPool;

      response.push(`**${name}**`);

      rolls.forEach((roll) => {
        const regex = /(\d*d\d+)|([*+)(-/])|(\d+)/g;
        const parsed = roll.dice.match(regex);

        const diceResult = helper.evalRoll(parsed);
        const diceOwner = roll.name;

        response.push(`${diceOwner}: \`(${parsed.join("")})\` = ${diceResult}`)
      });

      return message.channel.send(response, { split: true });
    }
  },
};

function poolParser(arg) {
  // receives: (Name:XdY+Z)
  // returns: obj form of roll

  const regex = /\(([^\)]+)\)/g;
  const parsed = arg.replace(/[()]/g, "");

  const parts = parsed.split(":");
  const name = parts[0];
  const dice = parts[1];

  return { name: name, dice: dice };
}

// A dice pool is like:
// var pool = {
//     name: some_name
//     rolls: [{name: "owner", dice: "d20+10"}]
// }

// User is prompted for something like:
// <PoolName> <(rollName:XdY+Z)> + <(rollName:XdY+Z)> ...

// So, to register a new pool:
// x/pool register Iniciativa (Carlos:d20+10) (Gaya:d20+12) etc.

// To use it:
// x/pool Iniciativa
// Will roll all of the expressions, and return:

// Carlos: 20
// Gaya: 22
