import { render } from '@testing-library/react'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { RadioGroup } from '..'

describe('RadioGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
      >
        <RadioGroup.Radio value="value-1" label="Radio 1" />
        <RadioGroup.Radio value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
        direction="row"
      >
        <RadioGroup.Radio value="value-1" label="Radio 1" />
        <RadioGroup.Radio value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
        helper="Helper content"
      >
        <RadioGroup.Radio value="value-1" label="Radio 1" />
        <RadioGroup.Radio value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
        error="Eror content"
      >
        <RadioGroup.Radio value="value-1" label="Radio 1" />
        <RadioGroup.Radio value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('throws if RadioGroup.Radio used without RadioGroup', () => {
    expect(() =>
      render(<RadioGroup.Radio value="value-1" label="Radio 1" />),
    ).toThrow('RadioGroup.Radio can only be used inside a RadioGroup')
  })
})
