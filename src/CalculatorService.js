class CalculatorService {
  constructor() {
    this.operators = {
      '+' : (x, y) => x + y,
      '-' : (x, y) => x - y,
      '*' : (x, y) => x * y,
      '/' : (x, y) => x / y
    }
  }

  static getOperandParameterLength = (operand) => {
    if(operand === '') return 0

    switch (operand) {
      case '/':
      case '+':
      case '*':
      case '-':
        return 2
      default:
        throw new Error('The length of operand parameter must be defined')
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