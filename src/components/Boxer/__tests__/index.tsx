import React from 'react'
import Boxer from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Boxer', () => {
  test('renders correctly with one child', () =>
    shouldMatchEmotionSnapshot(
      <Boxer>
        <p key="text">Test</p>
      </Boxer>,
    ))

  test('renders correctly with 3 childs', () =>
    shouldMatchEmotionSnapshot(
      <Boxer>
        <h1 key="a">Header 1</h1>
        <h2 key="b">Header 2</h2>
        <p key="c">paragraph</p>
      </Boxer>,
    ))
})
