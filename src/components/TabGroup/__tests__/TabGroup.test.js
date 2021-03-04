import React from 'react'
import TabGroup from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'
import { Box } from '../../Box'

describe('TabGroup', () => {
  test('renders correctly', () => {
    shouldMatchEmotionSnapshot(<TabGroup />)
  })

  test('renders correctly with variant default', () => {
    shouldMatchEmotionSnapshot(<TabGroup variant="default" />)
  })

  test('renders correctly with Tabs with prop', () => {
    shouldMatchEmotionSnapshot(
      <TabGroup selected={0} onChange={() => {}}>
        <TabGroup.Tab>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab>Very long tab name</TabGroup.Tab>
      </TabGroup>,
    )
  })

  test('renders correctly with Tabs and last disabled', () => {
    shouldMatchEmotionSnapshot(
      <TabGroup selected={2} onChange={() => {}}>
        <TabGroup.Tab>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab disabled>Very long tab name</TabGroup.Tab>
      </TabGroup>,
    )
  })

  test('renders correctly with Tabs name', () => {
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

  test('renders correctly with custom Tabs component', () => {
    shouldMatchEmotionSnapshot(
      <TabGroup>
        <TabGroup.Tab as="div">First</TabGroup.Tab>
        <TabGroup.Tab as="a">Second</TabGroup.Tab>
        <TabGroup.Tab as={Box} disabled>
          Very long tab name
        </TabGroup.Tab>
      </TabGroup>,
    )
  })
})
