import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { InformationIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, test } from 'vitest'
import { Snippet } from '../index'

const TEST_VALUE_MULTILINE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`

const TEST_VALUE_SINGLELINE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

describe('snippet', () => {
  test('renders correctly', () =>
    shouldMatchSnapshot(<Snippet>{TEST_VALUE_SINGLELINE}</Snippet>))

  test('renders correctly in multiline ', () =>
    shouldMatchSnapshot(<Snippet>{TEST_VALUE_MULTILINE}</Snippet>))

  test('renders correctly in multiline with prefix lines number', () =>
    shouldMatchSnapshot(
      <Snippet prefix="lines">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly in multiline with prefix command', () =>
    shouldMatchSnapshot(
      <Snippet prefix="command">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly with single line with prefix command', () =>
    shouldMatchSnapshot(
      <Snippet prefix="command">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with single line with prefix lines number', () =>
    shouldMatchSnapshot(
      <Snippet prefix="lines">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with copyText', () =>
    shouldMatchSnapshot(
      <Snippet copyText="Test">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with copiedText', () => {
    shouldMatchSnapshot(
      <Snippet copiedText="Test">{TEST_VALUE_SINGLELINE}</Snippet>,
    )
  })

  test('renders correctly with hideText', () => {
    shouldMatchSnapshot(
      <Snippet hideText="Test">{TEST_VALUE_MULTILINE}</Snippet>,
    )
  })

  test('renders correctly with showText', () => {
    const { asFragment } = renderWithTheme(
      <Snippet showText="Test">{TEST_VALUE_MULTILINE}</Snippet>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with initiallyExpanded', () => {
    const { asFragment } = renderWithTheme(
      <Snippet initiallyExpanded>{TEST_VALUE_MULTILINE}</Snippet>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should click on extend button to display full content on ', async () => {
    const { asFragment } = renderWithTheme(
      <Snippet>{TEST_VALUE_MULTILINE}</Snippet>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Show' }))

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with custom number of rows', () => {
    const { asFragment } = renderWithTheme(
      <Snippet rows={12}>{TEST_VALUE_MULTILINE}</Snippet>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with noExpandable', () => {
    const { asFragment } = renderWithTheme(
      <Snippet noExpandable>{TEST_VALUE_MULTILINE}</Snippet>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with label ', () =>
    shouldMatchSnapshot(
      <Snippet label="label">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly with labelDescription', () =>
    shouldMatchSnapshot(
      <Snippet
        label="label"
        labelDescription={<InformationIcon size="small" />}
      >
        {TEST_VALUE_MULTILINE}
      </Snippet>,
    ))
  test('renders correctly with helper ', () =>
    shouldMatchSnapshot(
      <Snippet helper="helper">{TEST_VALUE_MULTILINE}</Snippet>,
    ))
})
