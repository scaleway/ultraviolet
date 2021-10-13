import React from 'react'
import Expandable from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Expandable', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Expandable>Sample Expandable</Expandable>))
  test('renders correctly opened', () =>
    shouldMatchEmotionSnapshot(
      <Expandable opened>Sample Expandable</Expandable>,
    ))
})
