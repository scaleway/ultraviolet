import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { Radio } from '..'

describe('radio', () => {
  it('renders correctly', () =>
    shouldMatchSnapshot(
      <Radio label="Choice" name="radio" onChange={() => {}} value="choice" />,
    ))

  it('renders correctly when disabled', () =>
    shouldMatchSnapshot(
      <Radio
        disabled
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  it('renders correctly with tooltip', () =>
    shouldMatchSnapshot(
      <Radio
        label="Choice"
        name="radio"
        onChange={() => {}}
        tooltip="test"
        value="choice"
      />,
    ))

  it('renders without name', () =>
    shouldMatchSnapshot(
      <Radio disabled label="Choice" onChange={() => {}} value="choice" />,
    ))

  it('renders correctly when checked', () =>
    shouldMatchSnapshot(
      <Radio
        checked
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  it('renders correctly when error', () =>
    shouldMatchSnapshot(
      <Radio
        error="Invalid value"
        label="Choice"
        name="radio"
        onChange={() => {}}
        value="choice"
      />,
    ))

  it('renders correctly when helper', () =>
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
