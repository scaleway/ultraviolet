import React from 'react'
import { Stepper } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Stepper', () => {
  test('render correctly', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} />,
    )
  })

  test('render correctly disabled', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} text="unit" value={10} disabled />,
    )
  })

  test('render large size', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="large" />,
    )
  })

  test('render small size', () => {
    shouldMatchEmotionSnapshot(
      <Stepper minValue={0} maxValue={100} value={10} size="small" />,
    )
  })
})
