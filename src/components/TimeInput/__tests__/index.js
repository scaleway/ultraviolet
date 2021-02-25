import React from 'react'
import { TimeInput } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('TimeInput', () => {
  test('renders correctly with base props', () => {
    shouldMatchEmotionSnapshot(<TimeInput name="timeinput-test-0" />)
  })
})
