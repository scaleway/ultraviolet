import React from 'react'
import Unselectable from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Unselectable', () => {
  it(`renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <Unselectable>Can&apos;t touch this</Unselectable>,
    ))
})
