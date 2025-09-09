import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Expandable } from '..'

describe('expandable', () => {
  test('renders correctly with default values', () => {
    const { asFragment } = renderWithTheme(
      <Expandable>Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly opened', () => {
    const { asFragment } = renderWithTheme(
      <Expandable opened>Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with minHeight', () => {
    const { asFragment } = renderWithTheme(
      <Expandable minHeight={5}>Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with className', () => {
    const { asFragment } = renderWithTheme(
      <Expandable className="test">Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with animationDuration', () => {
    const { asFragment } = renderWithTheme(
      <Expandable animationDuration={500}>Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with animationDuration set to 0', () => {
    const { asFragment } = renderWithTheme(
      <Expandable animationDuration={0}>Sample Expandable</Expandable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
