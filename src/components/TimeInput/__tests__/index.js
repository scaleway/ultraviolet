import React from 'react'
import { TimeInput } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('TimeInput', () => {
  test('renders correctly with base props', () => {
    shouldMatchEmotionSnapshot(
      <TimeInput id="test" labelId="test-label" name="timeinput-test-0" />,
    )
  })
})
