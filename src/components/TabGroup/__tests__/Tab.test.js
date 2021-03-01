import React from 'react'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import Tab from '../Tab'

describe('Tab', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<Tab name="test">Test tab</Tab>)
  })

  test('renders correctly with variant default', () => {
    shouldMatchEmotionSnapshot(
      <Tab name="test" variant="default">
        Test tab
      </Tab>,
    )
  })

  test('renders correctly when disabled', () => {
    shouldMatchEmotionSnapshot(
      <Tab name="test" disabled>
        Test tab
      </Tab>,
    )
  })
})
