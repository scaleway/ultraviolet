import { render } from '@testing-library/react'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { RadioGroup } from '..'

describe('RadioGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        legend="Label"
        name="radio"
        onChange={() => {}}
        value="value-1"
      >
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        direction="row"
        legend="Label"
        name="radio"
        onChange={() => {}}
        value="value-1"
      >
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        helper="Helper content"
        legend="Label"
        name="radio"
        onChange={() => {}}
        value="value-1"
      >
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        error="Eror content"
        legend="Label"
        name="radio"
        onChange={() => {}}
        value="value-1"
      >
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    ))

  test('throws if RadioGroup.Radio used without RadioGroup', () => {
    expect(() =>
      render(<RadioGroup.Radio label="Radio 1" value="value-1" />),
    ).toThrow('RadioGroup.Radio can only be used inside a RadioGroup')
  })
})
