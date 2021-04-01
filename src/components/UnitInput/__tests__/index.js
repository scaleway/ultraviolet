import { ThemeProvider } from '@emotion/react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import theme from '../../../theme'
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
    let unit
    render(
      <ThemeProvider theme={theme}>
        <UnitInput
          name="test"
          onChange={value => {
            unit = value.unit
          }}
        />
      </ThemeProvider>,
    )

    const richSelect = document.querySelector("input[type='text']")
    userEvent.click(richSelect)
    userEvent.type(richSelect, 'weeks{enter}')
    await waitFor(() => expect(unit).toBe('weeks'))
  })
})

test(`renders with TextBox update`, async () => {
  let value
  render(
    <ThemeProvider theme={theme}>
      <UnitInput
        name="test"
        onChange={val => {
          value = val.value
        }}
      />
    </ThemeProvider>,
  )

  const input = document.querySelector("input[type='number']")
  await waitFor(() => expect(value).toBe('1'))
  userEvent.click(input)
  userEvent.type(input, '10')
  await waitFor(() => expect(value).toBe('110'))
  userEvent.type(input, '{selectall}{del}')
  await waitFor(() => expect(value).toBe('1'))
  userEvent.type(input, '{selectall}{del}00000')
  await waitFor(() => expect(value).toBe('100000'))
})
