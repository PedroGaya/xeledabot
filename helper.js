const fetch = require('node-fetch');

module.exports = {
    async generateBlob(url, key) { 
        const request = { 
            "jsonrpc": "2.0",
            method: "generateBlobs",
            params: {
                apiKey: key,
                n: 20,
                size: 64,
                format: "hex"
            },
            id: "XeledaBot",
        }
    
        return post(url, request)
    },
    evalRoll(args) {
        // args looks like this:
        // args = ["10d6", "+", "10"]
        var resultString = "";

        function isRoll(roll) {
            if (!roll.includes('d')) {return false;}
        
            var isRoll = true;
            for (const arg of roll.split('d')) {
                isRoll = isRoll && typeof(parseInt(arg)) == 'number'
            }
            return isRoll
        }

        function getRoll(roll) { 
            return "10"
        }

        for (const arg of args) {
            if (isRoll(arg)) {
                resultString = resultString.concat(getRoll(arg))
            } else {
                resultString = resultString.concat(arg)
            }
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