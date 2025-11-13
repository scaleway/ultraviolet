import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Radio } from '..'

describe('radio', () => {
  test('renders correctly', () =>
    shouldMatchSnapshot(
      <Radio label="Choice" name="radio" onChange={() => {}} value="choice" />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchSnapshot(
      <Radio
        disabled
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <Radio
        label="Choice"
        name="radio"
        onChange={() => {}}
        tooltip="test"
        value="choice"
      />,
    ))

  test('renders without name', () =>
    shouldMatchSnapshot(
      <Radio disabled label="Choice" onChange={() => {}} value="choice" />,
    ))

  test('renders correctly when checked', () =>
    shouldMatchSnapshot(
      <Radio
        checked
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly when error', () =>
    shouldMatchSnapshot(
      <Radio
        error="Invalid value"
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  test('renders correctly when helper', () =>
    shouldMatchSnapshot(
      <Radio
        helper="Helper"
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))
})
