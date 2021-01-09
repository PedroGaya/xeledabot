import fetch from "node-fetch";

export const request = async (
	query: string,
	variables?: string,
	endpoint?: string
) => {
	const path = endpoint ?? process.env.GRAPHQL_URL ?? "No endpoint defined.";

	return fetch(path, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: JSON.stringify({ query, variables }),
	})
		.then((r) => r.json())
		.then((r) => r.data);
};
