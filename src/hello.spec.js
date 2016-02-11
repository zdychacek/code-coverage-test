import hello from 'hello';

describe('hello', () => {
	it('should say hi to Ondrej', () => {
		expect(hello('Ondrej')).toBe('Hi Ondrej');
	});

	xit('should say hello to maros', () => {
		expect(hello('Maros')).toBe('Hello Maros');
	});
});
