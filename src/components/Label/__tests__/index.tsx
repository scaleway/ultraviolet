import React from 'react'
import Label from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Label', () => {
  it(`renders correctly`, () =>
    shouldMatchEmotionSnapshot(<Label>I&apos;m a Label</Label>))
})
