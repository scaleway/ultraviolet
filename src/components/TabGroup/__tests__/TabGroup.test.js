import React from 'react'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import TabGroup from '../TabGroup'

describe('TabGroup', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<TabGroup />)
  })

  test('renders correctly with variant default', () => {
    shouldMatchEmotionSnapshot(<TabGroup variant="default" />)
  })

  test('renders correctly with Tabs with name prop', () => {
    shouldMatchEmotionSnapshot(
      <TabGroup>
        <TabGroup.Tab name="first">First</TabGroup.Tab>
        <TabGroup.Tab name="second">Second</TabGroup.Tab>
        <TabGroup.Tab name="three">Very long tab name</TabGroup.Tab>
      </TabGroup>,
    )
  })

  test('renders correctly with Tabs and last disabled', () => {
    shouldMatchEmotionSnapshot(
      <TabGroup selected="second">
        <TabGroup.Tab name="first">First</TabGroup.Tab>
        <TabGroup.Tab name="second">Second</TabGroup.Tab>
        <TabGroup.Tab name="three" disabled>
          Very long tab name
        </TabGroup.Tab>
      </TabGroup>,
    )
  })
})
