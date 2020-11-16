import React from 'react'
import { Stepper } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Stepper', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} />,
    )
  })

  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} disabled />,
    )
  })
})
