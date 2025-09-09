import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import Breakpoint from '../Breakpoint'

describe('breakpoint', () => {
  test('renders correctly up prop', () =>
    shouldMatchEmotionSnapshot(<Breakpoint up="medium">Hello</Breakpoint>))
  test('renders correctly down prop', () =>
    shouldMatchEmotionSnapshot(<Breakpoint down="medium">Hello</Breakpoint>))
})
