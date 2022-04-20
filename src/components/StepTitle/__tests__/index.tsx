import React from 'react'
import StepTitle from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('StepTitle', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(<StepTitle index={1}>Item 1</StepTitle>))

  test('renders correctly with custom keyPrefix', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle index={1} keyPrefix="test">
        Item 1
      </StepTitle>,
    ))

  test('renders correctly with large size', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle index={1} size="large">
        Item 1 large
      </StepTitle>,
    ))

  test('renders correctly with disabled state', () =>
    shouldMatchEmotionSnapshot(
      <StepTitle index={1} disabled>
        <div>Item 1 with disabled state</div>
      </StepTitle>,
    ))
})
