import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Radio } from '..'

describe('radio', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Radio label="Choice" name="radio" onChange={() => {}} value="choice" />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        disabled
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        label="Choice"
        name="radio"
        onChange={() => {}}
        tooltip="test"
        value="choice"
      />,
    ))

  test('renders without name', () =>
    shouldMatchEmotionSnapshot(
      <Radio disabled label="Choice" onChange={() => {}} value="choice" />,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        checked
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly when error', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        error="Invalid value"
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly when helper', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        helper="Helper"
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))
})
