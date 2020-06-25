const fetch = require('node-fetch')
const MersenneTwister = require('mersenne-twister')
const cache = require('./cache.js')


module.exports = {
    async generateBlob(url, key) { 
        const request = { 
            "jsonrpc": "2.0",
            method: "generateBlobs",
            params: {
                apiKey: key,
                n: 20,
                size: 16,
                format: "hex"
            },
            id: "XeledaBot",
        }
    
        return post(url, request)
    },
    evalRoll(args) {
        // args looks like this:
        // args = ["10d6", "+", "10"]
        const regex = /(\d*d\d+)/g
        var resultString = "";


        function getRoll(roll) {
            const match = /(\d*)d(\d+)/g
            const array = match.exec(roll)

            const diceAmount = array[1] ? array[1] : 1
            const diceSize = array[2]

            const generator = new MersenneTwister()
            const data = cache.get()
            const seeds = data.seeds

            const callSeed = Math.floor(Math.random() * 19)
            const randomInt = parseInt(seeds[callSeed], 16)

            generator.init_seed(randomInt)

            var result = 0

            for (let i = 0; i < diceAmount; i++) {
                result += Math.floor(generator.random() * diceSize) + 1
            }
            
            return result.toString()
        }

        for (const arg of args) {
            var result = regex.test(arg) ? getRoll(arg) : arg
            resultString = resultString.concat(result)
        }

        return eval(resultString);
    },
}

function post(path, data) {
    return fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'},
    });
  }