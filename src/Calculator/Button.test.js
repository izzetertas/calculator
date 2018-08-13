import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './Button'

describe('<Button />', () => {
  it('should render an input', () => {
    const wrapper = shallow(
      <Button
        value='click me'
        disabled
        onClick={() => console.log('clicked')}
      />)
    expect(wrapper.find('input').length).toBe(1)
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should set type correctly', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('input').prop('type')).toEqual('button')
  });

  it('should set label correctly', () => {
    const wrapper = shallow(<Button label='label' />)
    expect(wrapper.find('input').prop('value')).toEqual('label')
  });

  it('should handle onClick correctly', () => {
    const onClickMock = jest.fn()
    const wrapper = shallow(<Button onClick={onClickMock} />)
    wrapper.find('input').simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  });

});