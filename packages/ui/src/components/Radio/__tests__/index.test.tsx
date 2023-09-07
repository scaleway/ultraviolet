import { describe, test } from '@jest/globals'
import { Radio } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Radio', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice" label="Choice" />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
        label="Choice"
      />,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        tooltip="test"
        label="Choice"
      />,
    ))

  test('renders without name', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} value="choice" disabled label="Choice" />,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        checked
        label="Choice"
      />,
    ))

  test('renders correctly when error', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        error="Invalid value"
        label="Choice"
      />,
    ))

  test('renders correctly when helper', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        helper="Helper"
        label="Choice"
      />,
    ))
})
