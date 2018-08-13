import CalculatorService from './CalculatorService'

describe('Calculator', () => {
  let calculator;
  beforeEach(() => {
    calculator = new CalculatorService()
  })

  it('should throw an error with undefined operator', () => {
    expect(() => calculator.calculate(null)).toThrowError('Invalid operation!')
  });

  it('should add numbers correctly', () => {
    expect(calculator.calculate('+', 1 ,2)).toEqual(3)
  });

  it('should subtract numbers correctly', () => {
    expect(calculator.calculate('-', 5, 3)).toEqual(2)
  });

  it('should divide numbers correctly', () => {
    expect(calculator.calculate('/', 15, 3)).toEqual(5)
  });

  it('should return infinity by dividing zero', () => {
    expect(calculator.calculate('/', 10, 0)).toEqual(Infinity)
  });

  it('should multiple numbers correctly', () => {
    expect(calculator.calculate('*', 15, 3)).toEqual(45)
  });
});