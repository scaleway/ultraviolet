import React from 'react'
import Placeholder, { placeholderTypes } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Placeholder', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test.each(placeholderTypes)('renders correctly with type="%s"', type =>
    shouldMatchEmotionSnapshot(<Placeholder variant={type} />),
  )
})
