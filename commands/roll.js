module.exports = {
    name: 'corno',
    aliases: ['r'],
    description: 'Rolls any set of dice witht the format XdY',
    usage: '<XdY> + <XdY> + ...',
    args: true,
	async execute(message, args) {
        console.log(args)
        var resultString = "";

        for (const arg of args) {
            if (isRoll(arg)) {
                resultString = resultString.concat(evaluateRoll(arg))
            } else {
                resultString = resultString.concat(arg)
            }
        }

        console.log(resultString)
        
        return message.channel.send(`${message.author} ${eval(resultString)}`)
	},
};

function isRoll(roll) {
    if (!roll.includes('d')) {return false;}

    var isRoll = true;
    for (const arg of roll.split('d')) {
        isRoll = isRoll && typeof(parseInt(arg)) == 'number'
    }
    return isRoll
}

function evaluateRoll(roll) { 
    return "10"
}