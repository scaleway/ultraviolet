import userEvent from '@testing-library/user-event'
import React from 'react'
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

  test(`renders with RichSelect update`, () => {
    shouldMatchEmotionSnapshot(<UnitInput name="test" />, {
      transform: node => {
        const richSelect = node.getByRole('textbox', 'text')
        userEvent.click(richSelect)
        userEvent.click(richSelect.parentElement, {
          view: window,
          pageX: 0,
          movementX: 200,
        })
      },
    })
  })

  test(`renders with TextBox update`, () => {
    shouldMatchEmotionSnapshot(<UnitInput name="test" />, {
      transform: node => {
        const input = node.getByRole('textbox', 'number')
        userEvent.click(input)
        userEvent.type(input, '10')
        userEvent.type(input, '111')
        userEvent.type(input, '0')
      },
    })
  })
})
