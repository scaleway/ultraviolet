import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Toggle } from '..'

describe('toggle', () => {
  test('renders correctly', () =>
    shouldMatchSnapshot(<Toggle name="test" onChange={() => {}} />))

  test('renders correctly when checked', () =>
    shouldMatchSnapshot(<Toggle checked name="test" onChange={() => {}} />))

  test('renders correctly when disabled', () =>
    shouldMatchSnapshot(<Toggle disabled name="test" onChange={() => {}} />))

  test('renders correctly when required with label', () =>
    shouldMatchSnapshot(
      <Toggle label="test" name="test" onChange={() => {}} required />,
    ))

  test('renders correctly when required with label left', () =>
    shouldMatchSnapshot(
      <Toggle
        label="test"
        labelPosition="left"
        name="test"
        onChange={() => {}}
        required
      />,
    ))

  test('renders correctly with non default size', () =>
    shouldMatchSnapshot(
      <Toggle name="test" onChange={() => {}} size="small" />,
    ))

  test('renders correctly label', () =>
    shouldMatchSnapshot(
      <Toggle label="This is a label" name="test" onChange={() => {}} />,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <Toggle
        label="This is a label"
        name="test"
        onChange={() => {}}
        tooltip="test"
      />,
    ))

  test('renders correctly with labels on left', () =>
    shouldMatchSnapshot(
      <Toggle
        label="This is a label"
        labelPosition="left"
        name="test"
        onChange={() => {}}
      />,
    ))

  test('renders correctly with custom labels on right', () =>
    shouldMatchSnapshot(
      <Toggle
        label="This is a label"
        labelPosition="right"
        name="test"
        onChange={() => {}}
      />,
    ))

  test('renders correctly with complex label', () =>
    shouldMatchSnapshot(
      <Toggle label={<span>Custom label rendered</span>} name="test" />,
    ))

  test('renders and click on toggle on', async () => {
    renderWithTheme(<Toggle label="This is a label" name="test" />)

    const input = screen.getByRole('checkbox')
    await userEvent.click(input)
    expect(input).toBeChecked()
  })

  test('renders correctly with helper', () =>
    shouldMatchSnapshot(
      <Toggle helper="This is a helper" label="This is a label" name="test" />,
    ))
  test('renders correctly with error', () =>
    shouldMatchSnapshot(
      <Toggle
        error="error text"
        helper="This is a helper"
        label="This is a label"
        name="test"
      />,
    ))
})
