import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Calculator from './Calculator'

let initialState;
let wrapper;

describe('<Calculator/>', () => {
  beforeEach(() => {
    initialState = {
      history: '',
      output: '',
      numbers: [],
      operand: '',
      completed: false
    }
    wrapper = shallow(<Calculator />)
  })

  it('should render correctly', () => {
      // const wrapper = shallow(<Calculator />)
      expect(toJson(wrapper)).toMatchSnapshot();
      expect(wrapper.find('Button').length).toBe(17)
      expect(wrapper.find('input').find({type: 'text'}).text()).toEqual('')
  });

  it('should set initial state correctly', () => {
    expect(wrapper.state()).toEqual(initialState)
  });

  describe('when user clicks AC button', () => {
    it('should reset to initial state', () => {
      wrapper.setState({ history: '...' })
      wrapper.find('Button').find({ label : 'AC'}).simulate('click')
      expect(wrapper.state()).toEqual(initialState)
    });
  });

  it('should assign output correctly', () => {
    let component = wrapper.find('input').find({type: 'text'}) 
    expect(component.prop('value')).toEqual('')
    expect(component.prop('className')).toEqual('output')
    const expected = '12.45'
    wrapper.setState({ output: expected })

    component = wrapper.find('input').find({type: 'text'}) 
    expect(component.prop('value')).toEqual(expected) 
  });
  
  it('should assign history correctly', () => {
    let component = wrapper.find('div').find({className: 'label'}) 
    expect(component.length).toBe(0)

    const expected = ' 2 * 12.5 = 25'
    wrapper.setState({ history: expected })

    component = wrapper.find('div').find({className: 'label'}) 
    expect(component.text()).toEqual(expected) 
  });

  describe('when click a number', () => {
    it('should assign output correctly', () => {
      const component = wrapper.find('Button').find({ label : '1'})
      component.simulate('click', { target: { value: '1' } })
      expect(wrapper.state('output')).toEqual('1')

      component.simulate('click', { target: { value: '2' } })
      expect(wrapper.state('output')).toEqual('12')
    });
  });
  
});