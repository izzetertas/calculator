import React, { Component } from 'react'
import Button from './Button'
import CalculatorService from '../CalculatorService'
import './Calculator.css'

class Calculator extends Component {
  initialState = {
    history: '',
    output: '0',
    currentNumber: '0',
    firstNumber: null,
    operand: ''
  }

  state = this.initialState

  operators = ['/', '*', '+', '-']
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
  
  handleOnClear = () => {
    this.setState(this.initialState)
  }

  isOperand = (operand) => this.operators.includes(operand)  
  isValidNumber = (value) => this.numbers.includes(value)  

  get getAllInputs() {
    const { firstNumber, currentNumber } = this.state
    const arr = []
    if(firstNumber !== null) arr.push(firstNumber)
    if(currentNumber !== '') arr.push(parseFloat(currentNumber))
    return arr
  }

  handleOnClick = (e) => {
    const input = e.target.value;

    if (this.isOperand(input)) {
      const { output, operand, currentNumber, firstNumber } = this.state
      
      const allNumbers = this.getAllInputs // currentNumber ? [firstNumber, currentNumber] : [firstNumber]
      if(!allNumbers) return

      if(!operand){  
        const newOperandParameterLength = CalculatorService.getOperandParameterLength(input)
        if(newOperandParameterLength > allNumbers.length)
          return this.setState({ 
            firstNumber: currentNumber ? parseFloat(currentNumber) : parseFloat(firstNumber),
            operand: input,
            currentNumber: ''
          })

        if(newOperandParameterLength === allNumbers.length){
          const result = this.calculateResult(input, allNumbers)
          return this.setState({
            operand: input,
            firstNumber: parseFloat(result),
            currentNumber: '',
            output: result,
            history: this.getResultMessage(operand, allNumbers, output)
          })
        }
      }
      
      const operandParameterLength = CalculatorService.getOperandParameterLength(operand)
      if(operandParameterLength === allNumbers.length) {
        const result = this.calculateResult(operand, allNumbers)
        return this.setState({
          operand: input,
          firstNumber: parseFloat(result),
          currentNumber: '',
          output: result,
          history: this.getResultMessage(operand, allNumbers, output)
        })    
      }
      else if(operandParameterLength > allNumbers.length) {
        const newOperandParameterLength = CalculatorService.getOperandParameterLength(input)
        if(newOperandParameterLength > allNumbers.length) {
          return this.setState({ operand: input, currentNumber: '' })        
        }
        if(newOperandParameterLength === allNumbers.length) {
          const result = this.calculateResult(input, allNumbers)
          return this.setState({
            operand: input,
            firstNumber: parseFloat(result),
            currentNumber: '',
            output: result,
            history: this.getResultMessage(operand, allNumbers, output)
          })      
        }
      }
    }
    else if(this.isValidNumber(input)){
      const { output, operand, currentNumber } = this.state
      if(output === 0 && input === '0') return

      if(operand && !currentNumber) {
        return this.setState((previousState) => ({
          currentNumber: input,
          output: input,
        }))
      }
      this.setState((previousState) => ({
        currentNumber: previousState.currentNumber !== '0' ? previousState.currentNumber + input : input,
        output: previousState.currentNumber !== '0' ? parseFloat(previousState.currentNumber + input) : parseFloat(input),
      }))
    }
    else if (input === '=') {
      const { firstNumber, currentNumber, operand, output } = this.state
      if(!operand || !firstNumber) return
      
      if(firstNumber !== null && !currentNumber) {
        const allNumbers = [firstNumber, firstNumber]
        const result = this.calculateResult(operand, allNumbers)
        return this.setState({
          operand: '',
          currentNumber: '',
          output: result,
          history: this.getResultMessage(operand, allNumbers, output),
          firstNumber: parseFloat(result)
        })
      }
      const allNumbers = this.getAllInputs
      const result = this.calculateResult(operand, allNumbers)
      this.setState({
        operand: '',
        currentNumber: '',
        output: result,
        history: this.getResultMessage(operand, allNumbers, output),
        firstNumber: parseFloat(result)
      })  
    }
  }

  calculateResult = (operand, numbers) => {
    const calculator = new CalculatorService()
    return calculator.calculate(operand, ...numbers).toFixed(2)
  }

  getResultMessage = (operand, numbers) => `(${numbers[0]} ${operand} ${numbers[1] || ''})`

  render(){
    const { history, output } = this.state;

    return (
      <div className='container'>
        <div className='result'>
          {
            history && 
            <div className='label'>
              {history}
            </div>
          }
            
          <div className='output-container'>
            <div className='ac-button-wrapper'>
              <Button label={'AC'} onClick={this.handleOnClear} />
            </div>
            <div>
              <input type='text' value={output} className='output' />
            </div>
          </div>
        </div>
        <div>
          <Button label={'7'} onClick={this.handleOnClick} />
          <Button label={'8'} onClick={this.handleOnClick} />
          <Button label={'9'} onClick={this.handleOnClick} />
          <Button label={'/'} onClick={this.handleOnClick} />
        </div>
        <div>
          <Button label={'4'} onClick={this.handleOnClick} />
          <Button label={'5'} onClick={this.handleOnClick} />
          <Button label={'6'} onClick={this.handleOnClick} />
          <Button label={'*'} onClick={this.handleOnClick} />
        </div>
        <div>
          <Button label={'1'} onClick={this.handleOnClick} />
          <Button label={'2'} onClick={this.handleOnClick} />
          <Button label={'3'} onClick={this.handleOnClick} />
          <Button label={'-'} onClick={this.handleOnClick} />
        </div>
        <div>
          <Button label={'0'} onClick={this.handleOnClick} />
          <Button label={'.'} onClick={this.handleOnClick} />
          <Button label={'='} onClick={this.handleOnClick} />
          <Button label={'+'} onClick={this.handleOnClick} />
        </div>
      </div>
    )
  }
}

export default Calculator;