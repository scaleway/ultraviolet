import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import renderWithTheme from '../../../helpers/renderWithTheme'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import UnitInput, { sizesHeight } from '../index'

describe('UnitInput', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test(`renders with default props`, () => {
    shouldMatchEmotionSnapshot(<UnitInput name="test" onChange={() => {}} />)
  })

  test(`renders with custom options`, () => {
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        options={[
          {
            value: 'kb',
            label: 'KB',
          },
          {
            value: 'mb',
            label: 'MB',
          },
          {
            value: 'gb',
            label: 'GB',
          },
        ]}
      />,
    )
  })

  test(`renders with min max`, () => {
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" minValue={10} maxValue={100} />,
    )
  })

  test(`renders with defaultValue`, () => {
    shouldMatchEmotionSnapshot(<UnitInput name="test" defaultValue={10} />)
  })

  test(`renders with defaultOption`, () => {
    shouldMatchEmotionSnapshot(
      <UnitInput
        name="test"
        defaultOption={{
          value: 'hours',
          label: 'Hours',
        }}
      />,
    )
  })

  Object.keys(sizesHeight).forEach(size =>
    test(`renders with size ${size}`, () => {
      shouldMatchEmotionSnapshot(<UnitInput name="default" size={size} />)
    }),
  )

  test(`renders with textBoxWidth and richSelectWidth`, () => {
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" richSelectWidth={100} textBoxWidth={100} />,
    )
  })

  test(`renders with disabled and placeHolder`, () => {
    shouldMatchEmotionSnapshot(
      <UnitInput name="test" placeholder="100" disabled />,
    )
  })

  test(`renders with RichSelect update`, async () => {
    const node = renderWithTheme(<UnitInput name="test" />)

    const richSelect = node.getByRole('textbox')
    userEvent.click(richSelect)
    userEvent.type(richSelect, 'weeks{enter}')
    await waitFor(() => expect(richSelect.value).toBe('weeks'))
  })
})

test(`renders with TextBox update`, async () => {
  const node = renderWithTheme(<UnitInput name="test" />)

  const input = node.getByRole('spinbutton')
  await waitFor(() => expect(input.value).toBe('1'))
  userEvent.click(input)
  userEvent.type(input, '10')
  await waitFor(() => expect(input.value).toBe('110'))
  userEvent.type(input, '{selectall}{del}')
  await waitFor(() => expect(input.value).toBe('1'))
  userEvent.type(input, '{selectall}{del}00000')
  await waitFor(() => expect(input.value).toBe('99999'))
})
