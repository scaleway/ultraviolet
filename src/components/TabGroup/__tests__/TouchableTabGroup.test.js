import React from 'react'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import TouchableTabGroup from '../TouchableTabGroup'

describe('TouchableTabGroup', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<TouchableTabGroup />)
  })

  test('renders correctly with variant default', () => {
    shouldMatchEmotionSnapshot(<TouchableTabGroup variant="default" />)
  })

  test('renders correctly with Tabs with name prop', () => {
    shouldMatchEmotionSnapshot(
      <TouchableTabGroup>
        <TouchableTabGroup.Tab name="first">First</TouchableTabGroup.Tab>
        <TouchableTabGroup.Tab name="second">Second</TouchableTabGroup.Tab>
        <TouchableTabGroup.Tab name="three">
          Very long tab name
        </TouchableTabGroup.Tab>
      </TouchableTabGroup>,
    )
  })

  test('renders correctly with Tabs and last disabled', () => {
    shouldMatchEmotionSnapshot(
      <TouchableTabGroup>
        <TouchableTabGroup.Tab name="first">First</TouchableTabGroup.Tab>
        <TouchableTabGroup.Tab name="second">Second</TouchableTabGroup.Tab>
        <TouchableTabGroup.Tab name="three" disabled>
          Very long tab name
        </TouchableTabGroup.Tab>
      </TouchableTabGroup>,
    )
  })
})
