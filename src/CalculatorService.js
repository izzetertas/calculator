class CalculatorService {
  constructor() {
    this.operators = {
      '+' : (x, y) => x + y,
      '-' : (x, y) => x - y,
      '*' : (x, y) => x * y,
      '/' : (x, y) => x / y
    }
  }

  calculate(operator, firstValue, secondValue) {
    const operatorFunc = this.operators[operator];
    if(!operatorFunc){
      throw new Error('Invalid operation!')
    }
    return operatorFunc(firstValue, secondValue);    
  }
}

export default CalculatorService