import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Stepper from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Stepper', () => {
  it('should renders correctly', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} />,
    )
  })

  it('should renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} disabled />,
    )
  })

  it('should renders large size', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="large" />,
    )
  })

  it('should renders small size', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="small" />,
    )
  })

  it('should click on min button', async () => {
    await shouldMatchEmotionSnapshot(
      <Stepper minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const minus = getByLabelText('Minus')
          const input = getByRole('textbox')

          userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('9'))

          userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('8'))
        },
      },
    )
  })

  it('should click on plus button with a step value', async () => {
    await shouldMatchEmotionSnapshot(
      <Stepper minValue={0} step={10} maxValue={100} value={10} />,
      {
        transform: async ({ getByLabelText, getByRole }) => {
          const plus = getByLabelText('Plus')
          const input = getByRole('textbox')

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    )
  })

  it('should focus input and modify value', async () => {
    await shouldMatchEmotionSnapshot(
      <Stepper minValue={0} step={10} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const buttonContainer = getByLabelText('Input')
          const input = getByRole('textbox')

          userEvent.click(buttonContainer)
          await waitFor(() => expect(input).toHaveFocus())
          userEvent.clear(input)
          userEvent.type(input, '20')
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    )
  })
})
