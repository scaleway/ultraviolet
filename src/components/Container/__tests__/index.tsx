import React from 'react'
import Container from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Container', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Container>Hello</Container>))

  test('renders correctly on edition mode', () =>
    shouldMatchEmotionSnapshot(<Container edition>Hello</Container>))

  test('renders correctly with small variant', () =>
    shouldMatchEmotionSnapshot(<Container small>Hello</Container>))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(<Container disabled>Hello</Container>))
})
