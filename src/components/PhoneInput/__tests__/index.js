import { fireEvent } from '@testing-library/react'
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
        inputProps={{
          id: 'tel-id',
          name: 'phone-number',
          placeholder: '+33 6 01 02 03 04',
        }}
      />,
    )
  })
  test('renders correctly with change', () => {
    shouldMatchEmotionSnapshot(
      <PhoneInput
        label="Phone number"
        inputProps={{
          id: 'tel-id',
          name: 'phone-number',
          dataTestid: 'test',
        }}
      />,
      {
        transform: node => {
          fireEvent.change(node.getByTestId('test'), {
            target: { value: '+3301020304' },
          })
        },
      },
    )
  })
})
