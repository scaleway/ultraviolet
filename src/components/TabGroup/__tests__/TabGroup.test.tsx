import { fireEvent } from '@testing-library/react'
import React from 'react'
import TabGroup from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'
import Box from '../../Box'

describe('TabGroup', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<TabGroup />))

  test('renders correctly with Tabs with prop', () =>
    shouldMatchEmotionSnapshot(
      <TabGroup selected={0} onChange={() => {}}>
        <TabGroup.Tab>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab>Very long tab name</TabGroup.Tab>
      </TabGroup>,
    ))

  test('renders correctly with Tabs and last disabled', () =>
    shouldMatchEmotionSnapshot(
      <TabGroup selected={2} onChange={() => {}}>
        <TabGroup.Tab>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab disabled>Very long tab name</TabGroup.Tab>
      </TabGroup>,
    ))

  test('renders correctly with Tabs name', () =>
    shouldMatchEmotionSnapshot(
      <TabGroup selected="second">
        <TabGroup.Tab name="first">First</TabGroup.Tab>
        <TabGroup.Tab name="second">Second</TabGroup.Tab>
        <TabGroup.Tab name="three" disabled>
          Very long tab name
        </TabGroup.Tab>
      </TabGroup>,
    ))

  test('renders correctly with custom Tabs component', () =>
    shouldMatchEmotionSnapshot(
      <TabGroup>
        <TabGroup.Tab as="div">First</TabGroup.Tab>
        <TabGroup.Tab as="a">Second</TabGroup.Tab>
        <TabGroup.Tab as={Box} disabled>
          Very long tab name
        </TabGroup.Tab>
      </TabGroup>,
    ))

  test('updates tab index on click', () => {
    const onChange = jest.fn()
    const onFirstTabClick = jest.fn()
    const { getByText } = renderWithTheme(
      <TabGroup onChange={onChange}>
        <TabGroup.Tab onClick={onFirstTabClick}>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab disabled>Disabled</TabGroup.Tab>
      </TabGroup>,
    )
    fireEvent.click(getByText('First'))
    expect(onChange).toHaveBeenLastCalledWith(0)
    fireEvent.click(getByText('Second'))
    expect(onChange).toHaveBeenLastCalledWith(1)
    onChange.mockReset()
    fireEvent.click(getByText('Disabled'))
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(1)
  })

  test('updates tab name on click', () => {
    const onChange = jest.fn()
    const onFirstTabClick = jest.fn()
    const { getByText } = renderWithTheme(
      <TabGroup onChange={onChange}>
        <TabGroup.Tab name="first" onClick={onFirstTabClick}>
          First
        </TabGroup.Tab>
        <TabGroup.Tab name="second">Second</TabGroup.Tab>
        <TabGroup.Tab disabled>Disabled</TabGroup.Tab>
      </TabGroup>,
    )
    fireEvent.click(getByText('First'))
    expect(onChange).toHaveBeenLastCalledWith('first')
    fireEvent.click(getByText('Second'))
    expect(onChange).toHaveBeenLastCalledWith('second')
    onChange.mockReset()
    fireEvent.click(getByText('Disabled'))
    expect(onChange).not.toHaveBeenCalled()
    expect(onFirstTabClick).toHaveBeenCalledTimes(1)
  })

  test('allows arrow navigation', () => {
    const onChange = jest.fn()
    const { getByRole, getByText } = renderWithTheme(
      <TabGroup onChange={onChange}>
        <TabGroup.Tab>First</TabGroup.Tab>
        <TabGroup.Tab>Second</TabGroup.Tab>
        <TabGroup.Tab disabled>Disabled</TabGroup.Tab>
      </TabGroup>,
    )
    const tablist = getByRole('tablist')
    fireEvent.keyDown(tablist, { code: 'ArrowRight' })
    expect(getByText('First')).toBe(document.activeElement)
    fireEvent.keyDown(tablist, { code: 'ArrowRight' })
    expect(getByText('Second')).toBe(document.activeElement)
    fireEvent.keyDown(tablist, { code: 'ArrowRight' }) // skip disabled tab & cycle
    expect(getByText('First')).toBe(document.activeElement)
    fireEvent.keyDown(tablist, { code: 'ArrowLeft' }) // cycle && skip disabled tab
    expect(getByText('Second')).toBe(document.activeElement)
    fireEvent.keyDown(getByText('Second'), { code: 'Space' })
    expect(onChange).toHaveBeenLastCalledWith(1)
    fireEvent.keyDown(tablist, { code: 'ArrowLeft' })
    expect(getByText('First')).toBe(document.activeElement)
    fireEvent.keyDown(getByText('First'), { code: 'Enter' })
    expect(onChange).toHaveBeenLastCalledWith(0)
  })

  test('renders correctly with invalid child', () =>
    shouldMatchEmotionSnapshot(
      <TabGroup>
        <TabGroup.Tab as="div">First</TabGroup.Tab>
        <TabGroup.Tab as="a">Second</TabGroup.Tab>
        test
      </TabGroup>,
    ))
})
