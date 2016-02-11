import sum from 'sum'

describe('sum', () => {
	it('sums up the given numbers', () => {
		expect(sum(1)).toBe(1)
		expect(sum(1, 2)).toBe(3)
		expect(sum(1, 2, 3)).toBe(6)
		expect(sum(1, 2, 3, 4)).toBe(10)
		expect(sum(1, 2, 3, 4, 5)).toBe(15)
		expect(sum(1, 2, 3, 4, 5, 6)).toBe(21)
	});
});
