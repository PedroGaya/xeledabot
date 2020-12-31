export function evalRoll(args: string[]) {
	// args looks like this:
	// args = ["10d6", "+", "10"]
	const regex = /(\d*d\d+)/g;
	var resultString = "";

	function getRoll(roll: string): string {
		const match = /(\d*)d(\d+)/g;
		const array = match.exec(roll);

		if (array === null) return "Error while parsing roll.";

		const diceAmount = parseInt(array[1] ? array[1] : "1");
		const diceSize = parseInt(array[2]);

		var result = "(";

		function getRandomInt(min: number, max: number) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		for (let i = 0; i < diceAmount; i++) {
			result += `${getRandomInt(1, diceSize)}${
				i == diceAmount - 1 ? ")" : "+"
			}`;
		}

		return result;
	}

	for (const arg of args) {
		var result = regex.test(arg) ? getRoll(arg) : arg;
		resultString = resultString.concat(result);
	}

	return resultString;
}
