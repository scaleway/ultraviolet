import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectNumber from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('SelectNumber', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber
        minValue={0}
        maxValue={100}
        text="unit"
        value={10}
        onChange={() => {}}
      />,
    ))

  it('should renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber
        minValue={0}
        maxValue={100}
        text="unit"
        value={10}
        disabled
      />,
    ))

  it('should renders correctly min value', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} maxValue={100} text="unit" value={0} />,
    ))

  it('should renders correctly max value', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} maxValue={100} text="unit" value={100} />,
    ))

  it('should renders large size', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} maxValue={100} value={10} size="large" />,
    ))

  it('should renders small size', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} maxValue={100} value={10} size="small" />,
    ))

  it('should click on center button', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const inputButton = getByLabelText('Input')
          const input = getByRole('textbox') as HTMLTextAreaElement

          userEvent.click(inputButton)
          await waitFor(() => expect(input.value).toBe('10'))
        },
      },
    ))

  it('should click on min button', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} step={1} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const minus = getByLabelText('Minus')
          const input = getByRole('textbox') as HTMLTextAreaElement

          userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('9'))

          userEvent.click(minus)
          await waitFor(() => expect(input.value).toBe('8'))
        },
      },
    ))

  it('should click on plus button with a step value', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber
        minValue={0}
        step={10}
        maxValue={100}
        value={10}
        onBlur={() => {}}
      />,
      {
        transform: async ({ getByLabelText, getByRole }) => {
          const plus = getByLabelText('Plus')
          const input = getByRole('textbox') as HTMLTextAreaElement

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should focus input and modify value', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={0} step={10} maxValue={100} value={10} />,
      {
        transform: async ({ getByRole, getByLabelText }) => {
          const buttonContainer = getByLabelText('Input')
          const input = getByRole('textbox') as HTMLTextAreaElement

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
      <SelectNumber
        minValue={10}
        maxValue={100}
        value={30}
        onMinCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox') as HTMLTextAreaElement
          if (input.parentElement) userEvent.click(input.parentElement)
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
      <SelectNumber
        minValue={10}
        maxValue={100}
        value={30}
        onMaxCrossed={() => {}}
      />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox') as HTMLTextAreaElement
          if (input.parentElement) userEvent.click(input.parentElement)
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
      <SelectNumber minValue={10} maxValue={100} value={30} />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox') as HTMLTextAreaElement
          if (input.parentElement) userEvent.click(input.parentElement)
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

  it('should click on plus button with a step value and an in-between value set', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber
        minValue={0}
        step={10}
        maxValue={100}
        value={12}
        onBlur={() => {}}
      />,
      {
        transform: async ({ getByLabelText, getByRole }) => {
          const plus = getByLabelText('Plus')
          const input = getByRole('textbox') as HTMLTextAreaElement

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('20'))

          userEvent.click(plus)
          await waitFor(() => expect(input.value).toBe('30'))
        },
      },
    ))

  it('should increase and decrease input with arrow up and down, step and an in-between value set', () =>
    shouldMatchEmotionSnapshot(
      <SelectNumber minValue={10} maxValue={100} value={32} step={10} />,
      {
        transform: async ({ getByRole }) => {
          const input = getByRole('textbox') as HTMLTextAreaElement
          if (input.parentElement) userEvent.click(input.parentElement)
          userEvent.type(input, '{arrowup}')
          await waitFor(() => expect(input.value).toBe('40'))
          userEvent.type(input, '{arrowdown}')
          await waitFor(() => expect(input.value).toBe('30'))
          userEvent.clear(input)
          userEvent.type(input, '12')
          userEvent.type(input, '{arrowdown}')
          await waitFor(() => expect(input.value).toBe('10'))
          userEvent.clear(input)
          userEvent.type(input, '99')
          userEvent.type(input, '{arrowup}')
          await waitFor(() => expect(input.value).toBe('100'))
        },
      },
    ))
})
