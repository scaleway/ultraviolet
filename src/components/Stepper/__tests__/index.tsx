import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Stepper from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Stepper', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Stepper
        minValue={0}
        maxValue={100}
        text="unit"
        value={10}
        onChange={() => {}}
      />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} disabled />,
    ))

  it('should renders large size', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="large" />,
    ))

  it('should renders small size', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="small" />,
    ))

  it('should click on center button', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const inputButton = getByLabelText('Input')
          const input = getByRole('textbox')

          userEvent.click(inputButton)
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(
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
    ))

  it('should click on plus button with a step value', () =>
    shouldMatchEmotionSnapshot(
      <Stepper
        minValue={0}
        step={10}
        maxValue={100}
        value={10}
        onBlur={() => {}}
      />,
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
    ))

  it('should focus input and modify value', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} step={10} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const buttonContainer = getByLabelText('Input')
          const input = getByRole('textbox')

          userEvent.click(buttonContainer)
          await waitFor(() => expect(input).toHaveFocus())
          input.blur()

          userEvent.click(buttonContainer)
          userEvent.clear(input)
          userEvent.type(input, '20')
          await waitFor(() => expect(input.value).toBe('20'))
        },
      },
    ))
  it('should focus input and modify value onMinCrossed', () =>
    shouldMatchEmotionSnapshot(
      <Stepper
        minValue={10}
        maxValue={100}
        value={30}
        onMinCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox')
          userEvent.click(input.parentElement)
          userEvent.clear(input)
          userEvent.type(input, '1')
          await waitFor(() => expect(input.value).toBe('1'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should focus input and modify value onMaxCrossed', () =>
    shouldMatchEmotionSnapshot(
      <Stepper
        minValue={10}
        maxValue={100}
        value={30}
        onMaxCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox')
          userEvent.click(input.parentElement)
          userEvent.clear(input)
          userEvent.type(input, '120')
          await waitFor(() => expect(input.value).toBe('120'))
          input.blur()
          await waitFor(() => expect(input.value).toBe('100'))
        },
      },
    ))

  it('should increase and decrease input with arrow up and down', () =>
    shouldMatchEmotionSnapshot(
      <Stepper minValue={10} maxValue={100} value={30} />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox')
          userEvent.click(input.parentElement)
          userEvent.type(input, '{arrowup}')
          await waitFor(() => expect(input.value).toBe('31'))
          userEvent.type(input, '{arrowdown}')
          await waitFor(() => expect(input.value).toBe('30'))
          userEvent.clear(input)
          userEvent.type(input, '10')
          userEvent.type(input, '{arrowdown}')
          await waitFor(() => expect(input.value).toBe('10'))
          userEvent.clear(input)
          userEvent.type(input, '100')
          userEvent.type(input, '{arrowup}')
          await waitFor(() => expect(input.value).toBe('100'))
        },
      },
    ))
})
