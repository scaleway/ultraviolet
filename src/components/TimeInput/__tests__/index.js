import React from 'react'
import { TimeInput } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('TimeInput', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly with base props', () => {
    shouldMatchEmotionSnapshot(<TimeInput name="timeinput-test-0" />)
  })
})
