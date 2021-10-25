import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import PhoneInput from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

const Controlled = () => {
  const [state, setState] = React.useState('+33')

  return (
    <PhoneInput
      value={state}
      onChange={event => setState(event.currentTarget.value)}
      label="Phone number"
      inputProps={{
        id: 'tel-id',
        name: 'phone-number',
        placeholder: '+33 6 01 02 03 04',
      }}
    />
  )
}

describe('PhoneInput', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<PhoneInput onChange={() => {}} />))
  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<PhoneInput disabled disableDropdown />))

  test('renders correctly with default value', () =>
    shouldMatchEmotionSnapshot(<PhoneInput value="+33" />))

  test('renders correctly with props', () =>
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
    ))

  test('renders correctly with change', async () => {
    await shouldMatchEmotionSnapshot(<Controlled />, {
      transform: async ({ getByRole }) => {
        const input = getByRole('textbox') as HTMLInputElement
        userEvent.clear(input)
        userEvent.type(input, '+33102030405')
        await waitFor(() => expect(input.value).toBe('+33 1 02 03 04 05'))
      },
    })
  })
})
