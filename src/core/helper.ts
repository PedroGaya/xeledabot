const fetch = require('node-fetch')

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

            var result = "("

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min
            }

            for (let i = 0; i < diceAmount; i++) {
                result += `${getRandomInt(1, diceSize)}${i == diceAmount - 1 ? ")" : "+"}`
            }
            
            return result
        }

        for (const arg of args) {
            var result = regex.test(arg) ? getRoll(arg) : arg
            resultString = resultString.concat(result)
        }

        return resultString;
    },
}

function post(path, data) {
    return fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'},
    });
  }