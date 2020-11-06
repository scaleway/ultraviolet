import React from 'react'
import { Boxer } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Boxer', () => {
  test('renders correctly with one child', () => {
    shouldMatchEmotionSnapshot(<Boxer>Test</Boxer>)
  })

  test('renders correctly with 3 childs', () => {
    shouldMatchEmotionSnapshot(
      <Boxer>
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <p>paragraph</p>
      </Boxer>,
    )
  })
})
