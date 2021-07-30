import React from 'react'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import Breakpoint from '../Breakpoint'

describe('Breakpoint', () => {
  test('renders correctly up prop', () =>
    shouldMatchEmotionSnapshot(<Breakpoint up="medium">Hello</Breakpoint>))
  test('renders correctly down prop', () =>
    shouldMatchEmotionSnapshot(<Breakpoint down="medium">Hello</Breakpoint>))
})
