import React from 'react'
import Image from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Image', () => {
  test(`render correctly`, () =>
    shouldMatchEmotionSnapshot(<Image src="//toto.png" />))
})
