import React, { Component } from 'react'
import Button from './Button'
import CalculatorService from '../CalculatorService'
import './Calculator.css'

class Calculator extends Component {
  initialState = {
    history: '',
    output: '',
    numbers: [],
    operand: '',
    completed: false
  }

  state = this.initialState

  operators = ['/', '*', '+', '-']
  numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
  
  handleOnClear = () => {
    this.setState(this.initialState)
  }

  handleOnClick = (e) => {
    const selectedValue = e.target.value;

    if (this.operators.includes(selectedValue)) {
      this.setState((previousState) => {
        const newNumbers = [...previousState.numbers, parseFloat(previousState.output)]
        return {
          operand: selectedValue,
          numbers : newNumbers,
          output: '',
          history: this.setResultMessage(selectedValue, newNumbers)
        }
      })
    }
    else if(this.numbers.includes(selectedValue)){
      this.setState((previousState) => ({
        output: previousState.output + selectedValue,
        // history: ''
      }))
    }
    else if (selectedValue === '=') {
      this.setState((previousState) => ({
          numbers : [...previousState.numbers, parseFloat(previousState.output)],
          output: '',
          history: ''
        }),
        () => this.calculateResult()
      )
    }
  }

  calculateResult = () => {
    const { operand, numbers } = this.state
    const calculator = new CalculatorService()
    const output = calculator.calculate(operand, ...numbers).toFixed(2) 
    this.setState({
      completed: true,
      output: output,
      history: this.setResultMessage(operand, numbers, output),
      numbers: []
    })
  }

  setResultMessage = (operand, numbers) => `(${numbers[0]} ${operand} ${numbers[1] || ''})`

  render(){
    const { history, output, completed: disabled } = this.state;

    return(
      <div className='container'>
        <div className='result'>
          {history &&
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
          <Button label={'7'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'8'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'9'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'/'} onClick={this.handleOnClick} disabled={disabled} />
        </div>
        <div>
          <Button label={'4'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'5'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'6'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'*'} onClick={this.handleOnClick} disabled={disabled} />
        </div>
        <div>
          <Button label={'1'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'2'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'3'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'-'} onClick={this.handleOnClick} disabled={disabled} />
        </div>
        <div>
          <Button label={'0'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'.'} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'='} onClick={this.handleOnClick} disabled={disabled} />
          <Button label={'+'} onClick={this.handleOnClick} disabled={disabled} />
        </div>
      </div>
    )
  }
}

export default Calculator;