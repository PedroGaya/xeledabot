import fetch from "node-fetch";

export async function callRandomDotOrgAPI(url: string, key: string) {
	const request = {
		jsonrpc: "2.0",
		method: "generateBlobs",
		params: {
			apiKey: key,
			n: 20,
			size: 16,
			format: "hex",
		},
		id: "XeledaBot",
	};
	return post(url, request);
}

function post(path: string, data: any) {
	return fetch(path, {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	});
}
