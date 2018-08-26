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
    operand: '',
    isClickedEqual: false,
    isPressedEqual: false,
    memoryRecordedNumber: 0
  }

  state = this.initialState
  
  handleOnClear = () => {
    this.setState(Object.assign({}, this.initialState, { memoryRecordedNumber: this.state.memoryRecordedNumber }))
  }

  get getinputs() {
    const { firstNumber, currentNumber } = this.state
    const arr = []
    if(firstNumber !== null) arr.push(firstNumber)
    if(currentNumber !== '') arr.push(parseFloat(currentNumber))
    return arr
  }

  handleOnMemoryButton = (e) => {
    const input = e.target.value;
    const { output, memoryRecordedNumber=0 } = this.state
    if(input === 'MR') {
      this.setState({
        currentNumber: memoryRecordedNumber || 0,
        output: memoryRecordedNumber  || 0
      })
    } else if(input === 'M+') {
      this.setState({
        memoryRecordedNumber : parseFloat(output) + (memoryRecordedNumber  || 0)
      })
    } else if(input === 'MC') {
      this.setState({
        memoryRecordedNumber : 0
      })
    }

  }

  handleOnClickNumber = (e) => {
    const input = e.target.value;
    const { output, operand, currentNumber, isClickedEqual } = this.state
    if(output === 0 && input === '0') return

    if(isClickedEqual && !currentNumber) {
      return this.setState({
        currentNumber: input,
        firstNumber: null,
        operand: '',
        isClickedEqual: false,
        output: input,
      })
    }

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

  handleOnClickEqual = (e) => {
    if(e.target.value !== '=') return
    
    const { firstNumber, currentNumber, operand, output } = this.state
    if(!operand || !firstNumber) return
    
    if(firstNumber !== null && !currentNumber) {
      const inputs = [firstNumber, firstNumber]
      const result = this.calculateResult(operand, inputs)
      return this.setState({
        isClickedEqual: true,
        currentNumber: '',
        output: result,
        history: this.getResultMessage(operand, inputs, output),
        firstNumber: parseFloat(result)
      })
    }
    const inputs = this.getinputs
    const result = this.calculateResult(operand, inputs)
    this.setState({
      isClickedEqual: true,
      currentNumber: '',
      output: result,
      history: this.getResultMessage(operand, inputs, output),
      firstNumber: parseFloat(result)
    })
  }

  handleOnClickOperand = (e) => {
    const input = e.target.value;
    const { output, operand, currentNumber, firstNumber, isClickedEqual } = this.state
      
    const inputs = this.getinputs
    if(!inputs) return

    if(!operand || isClickedEqual){  
      const newOperandParameterLength = CalculatorService.getOperandParameterLength(input)
      if(newOperandParameterLength > inputs.length)
        return this.setState({ 
          firstNumber: currentNumber ? parseFloat(currentNumber) : parseFloat(firstNumber),
          operand: input,
          currentNumber: '',
          isClickedEqual: false
        })

      if(newOperandParameterLength === inputs.length){
        const result = this.calculateResult(input, inputs)
        return this.setState({
          operand: input,
          firstNumber: parseFloat(result),
          currentNumber: '',
          output: result,
          history: this.getResultMessage(operand, inputs, output)
        })
      }
    }
    
    const operandParameterLength = CalculatorService.getOperandParameterLength(operand)
    if(operandParameterLength === inputs.length) {
      const result = this.calculateResult(operand, inputs)
      return this.setState({
        operand: input,
        firstNumber: parseFloat(result),
        currentNumber: '',
        output: result,
        history: this.getResultMessage(operand, inputs, output)
      })    
    }
    else if(operandParameterLength > inputs.length) {
      const newOperandParameterLength = CalculatorService.getOperandParameterLength(input)
      if(newOperandParameterLength > inputs.length) {
        return this.setState({ operand: input, currentNumber: '' })        
      }
      if(newOperandParameterLength === inputs.length) {
        const result = this.calculateResult(input, inputs)
        return this.setState({
          operand: input,
          firstNumber: parseFloat(result),
          currentNumber: '',
          output: result,
          history: this.getResultMessage(operand, inputs, output)
        })      
      }
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
        {
          history && 
          <div className='history'>
            {history}
          </div>
        }
        <input type='text' value={output} />
        <div className='button-container'>
          <div>
            <Button label={'C'} onClick={this.handleOnClear} className='clean-button' />
            <Button label={'MC'} onClick={this.handleOnMemoryButton} />
            <Button label={'MR'} onClick={this.handleOnMemoryButton} />
            <Button label={'M+'} onClick={this.handleOnMemoryButton} />
          </div>
          <div>
            <Button label={'7'} onClick={this.handleOnClickNumber} />
            <Button label={'8'} onClick={this.handleOnClickNumber} />
            <Button label={'9'} onClick={this.handleOnClickNumber} />
            <Button label={'/'} onClick={this.handleOnClickOperand} />
          </div>
          <div>
            <Button label={'4'} onClick={this.handleOnClickNumber} />
            <Button label={'5'} onClick={this.handleOnClickNumber} />
            <Button label={'6'} onClick={this.handleOnClickNumber} />
            <Button label={'*'} onClick={this.handleOnClickOperand} />
          </div>
          <div>
            <Button label={'1'} onClick={this.handleOnClickNumber} />
            <Button label={'2'} onClick={this.handleOnClickNumber} />
            <Button label={'3'} onClick={this.handleOnClickNumber} />
            <Button label={'-'} onClick={this.handleOnClickOperand} />
          </div>
          <div>
            <Button label={'0'} onClick={this.handleOnClickNumber} />
            <Button label={'.'} onClick={this.handleOnClickNumber} />
            <Button label={'='} onClick={this.handleOnClickEqual} />
            <Button label={'+'} onClick={this.handleOnClickOperand} />
          </div>
        </div>
      </div>
    )
  }
}

export default Calculator;