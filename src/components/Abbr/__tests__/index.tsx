import React from 'react'
import Abbr from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Abbr', () => {
  test('renders correctly', async () =>
    shouldMatchEmotionSnapshot(<Abbr>Abbreviation</Abbr>))

  test('renders with title', async () =>
    shouldMatchEmotionSnapshot(<Abbr title="Abbreviation">Abbr</Abbr>))
})
