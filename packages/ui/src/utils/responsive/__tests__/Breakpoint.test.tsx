import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import Breakpoint from '../Breakpoint'

describe('breakpoint', () => {
  test('renders correctly up prop', () =>
    shouldMatchSnapshot(<Breakpoint up="medium">Hello</Breakpoint>))
  test('renders correctly down prop', () =>
    shouldMatchSnapshot(<Breakpoint down="medium">Hello</Breakpoint>))
})
