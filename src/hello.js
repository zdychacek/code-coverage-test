/**
 * Print greeting.
 */
const hello = (name) => {
	if (name[0] === 'O') {
		return 'Hi ' + name;
	}
	else {
		return 'Hello ' + name;
	}
}

export default hello;
