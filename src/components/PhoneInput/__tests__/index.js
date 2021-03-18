import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  test('renders correctly with change', async () => {
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
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox')
          userEvent.type(input, '+33102030405')
          await waitFor(() => expect(input.value).toBe('+33 1 02 03 04 05'))
        },
      },
    )
  })
})
