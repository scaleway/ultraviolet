import React from 'react'
import StepTitle from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('StepTitle', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(<StepTitle bulletText="1">Item 1</StepTitle>))

  test('renders correctly with custom keyPrefix', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle bulletText="1" keyPrefix="test">
        Item 1
      </StepTitle>,
    ))

  test('renders correctly with small size', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle bulletText="1" size="small">
        Item 1 small
      </StepTitle>,
    ))

  test('renders correctly with disabled state', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle bulletText="1" disabled>
        <div>Item 1 with disabled state</div>
      </StepTitle>,
    ))
})
