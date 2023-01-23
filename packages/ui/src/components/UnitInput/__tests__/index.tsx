import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UnitInput, sizesHeight } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('UnitInput', () => {
  test(`renders with default props`, () =>
    shouldMatchEmotionSnapshot(<UnitInput name="test" onChange={() => {}} />))

  test(`renders with custom options`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        options={[
          {
            label: 'KB',
            value: 'kb',
          },
          {
            label: 'MB',
            value: 'mb',
          },
          {
            label: 'GB',
            value: 'gb',
          },
        ]}
      />,
    ))

  test(`renders with min max`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" minValue={10} maxValue={100} />,
    ))

  test(`renders with defaultValue`, () =>
    shouldMatchEmotionSnapshot(<UnitInput name="test" defaultValue={10} />))

  test(`renders with defaultOption`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        defaultOption={{
          label: 'Hours',
          value: 'hours',
        }}
      />,
    ))

  Object.keys(sizesHeight).forEach(size =>
    test(`renders with size ${size}`, () =>
      shouldMatchEmotionSnapshot(<UnitInput name="default" size={size} />)),
  )

  test(`renders with textBoxWidth and selectInputWidth`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" selectInputWidth={100} textBoxWidth={100} />,
    ))

  test(`renders with disabled and placeHolder`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" placeholder="100" disabled />,
    ))

  test(`renders with SelectInput update`, async () => {
    const node = renderWithTheme(<UnitInput name="test" />)

    // Role textbox is only for the searchable input
    const valueContainer = node.getByRole('combobox') as HTMLInputElement
    await userEvent.click(valueContainer)
    await userEvent.type(valueContainer, 'weeks{enter}')
    await waitFor(() => expect(valueContainer.value).toBe(''))

    const selectInput = node.getByTestId('select-input-test-unit')
    // Real select input value is inside a hidden input with the name put in SelectInput props.
    const selectInputInputHidden = selectInput.querySelector(
      'input[type="hidden"]',
    ) as HTMLInputElement
    await waitFor(() => expect(selectInputInputHidden?.value).toBe('weeks'))
  })
})

test(`renders with TextInput update`, async () => {
  const node = renderWithTheme(<UnitInput name="test" />)

  const input = node.getByRole('spinbutton') as HTMLInputElement
  await waitFor(() => expect(input.value).toBe('1'))
  await userEvent.click(input)
  await userEvent.type(input, '10')
  await waitFor(() => expect(input.value).toBe('110'))
  await userEvent.clear(input)
  await waitFor(() => expect(input.value).toBe('1'))
  await userEvent.clear(input)
  await userEvent.type(input, '111111111')
  await waitFor(() => expect(input.value).toBe('99999'))
})
