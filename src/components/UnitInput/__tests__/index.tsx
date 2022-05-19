import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'
import UnitInput, { sizesHeight } from '../index'

describe('UnitInput', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

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

  test(`renders with textBoxWidth and richSelectWidth`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" richSelectWidth={100} textBoxWidth={100} />,
    ))

  test(`renders with disabled and placeHolder`, () =>
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" placeholder="100" disabled />,
    ))

  test(`renders with RichSelect update`, async () => {
    const node = renderWithTheme(<UnitInput name="test" />)

    // Role textbox is only for the searchable input
    const valueContainer = node.getByRole('combobox') as HTMLInputElement
    userEvent.click(valueContainer)
    userEvent.type(valueContainer, 'weeks{enter}')
    await waitFor(() => expect(valueContainer.value).toBe(''))

    const richSelect = node.getByTestId('rich-select-test-unit')
    // Real rich select value is inside a hidden input with the name put in RichSelect props.
    const richSelectInputHidden = richSelect.querySelector(
      'input[type="hidden"]',
    ) as HTMLInputElement
    await waitFor(() => expect(richSelectInputHidden?.value).toBe('weeks'))
  })
})

test(`renders with TextBox update`, async () => {
  const node = renderWithTheme(<UnitInput name="test" />)

  const input = node.getByRole('spinbutton') as HTMLInputElement
  await waitFor(() => expect(input.value).toBe('1'))
  userEvent.click(input)
  userEvent.type(input, '10')
  await waitFor(() => expect(input.value).toBe('110'))
  userEvent.type(input, '{selectall}{del}')
  await waitFor(() => expect(input.value).toBe('1'))
  userEvent.type(input, '{selectall}{del}111111111')
  await waitFor(() => expect(input.value).toBe('99999'))
})
