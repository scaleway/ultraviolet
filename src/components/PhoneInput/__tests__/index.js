import React from 'react'
import PhoneInput from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('PhoneInput', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<PhoneInput onChange={() => {}} />)
  })
  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<PhoneInput disabled disableDropdown />)
  })

  test('renders correctly with default value', () => {
    shouldMatchEmotionSnapshot(<PhoneInput value="+33" />)
  })

  test('renders correctly with props', () => {
    shouldMatchEmotionSnapshot(
      <PhoneInput
        value="+33"
        onChange={() => {}}
        label="Phone number"
        inputProps={{ id: 'tel-id', name: 'phone-number' }}
      />,
    )
  })
})
