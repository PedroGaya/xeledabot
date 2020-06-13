const fetch = require('node-fetch')

module.exports = {
    async generateBlob(url, key) { 
        const request = { 
            "jsonrpc": "2.0",
            method: "generateBlobs",
            params: {
                apiKey: key,
                n: 1,
                size: 64,
                format: "hex"
            },
            id: "XeledaBot",
        }
    
        return post(url, request)
    }, 
}

function post(path, data) {
    return fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json'},
    });
  }