import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Toggle } from '..'

describe('Toggle', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Toggle name="test" onChange={() => {}} />))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Toggle checked name="test" onChange={() => {}} />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Toggle disabled name="test" onChange={() => {}} />,
    ))

  test('renders correctly when required with label', () =>
    shouldMatchEmotionSnapshot(
      <Toggle label="test" name="test" onChange={() => {}} required />,
    ))

  test('renders correctly when required with label left', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        label="test"
        labelPosition="left"
        name="test"
        onChange={() => {}}
        required
      />,
    ))

  test('renders correctly with non default size', () =>
    shouldMatchEmotionSnapshot(
      <Toggle name="test" onChange={() => {}} size="small" />,
    ))

  test('renders correctly label', () =>
    shouldMatchEmotionSnapshot(
      <Toggle label="This is a label" name="test" onChange={() => {}} />,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        label="This is a label"
        name="test"
        onChange={() => {}}
        tooltip="test"
      />,
    ))

  test('renders correctly with labels on left', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        label="This is a label"
        labelPosition="left"
        name="test"
        onChange={() => {}}
      />,
    ))

  test('renders correctly with custom labels on right', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        label="This is a label"
        labelPosition="right"
        name="test"
        onChange={() => {}}
      />,
    ))

  test('renders correctly with complex label', () =>
    shouldMatchEmotionSnapshot(
      <Toggle label={<span>Custom label rendered</span>} name="test" />,
    ))

  test('renders and click on toggle on', async () => {
    renderWithTheme(<Toggle label="This is a label" name="test" />)

    const input = screen.getByRole('checkbox')
    await userEvent.click(input)
    expect(input.getAttribute('aria-checked')).toBe('true')
  })

  test('renders correctly with helper', () =>
    shouldMatchEmotionSnapshot(
      <Toggle helper="This is a helper" label="This is a label" name="test" />,
    ))
  test('renders correctly with error', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        error="error text"
        helper="This is a helper"
        label="This is a label"
        name="test"
      />,
    ))
})
