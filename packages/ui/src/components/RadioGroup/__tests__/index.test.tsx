import { render } from '@testing-library/react'
import { RadioGroup } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('RadioGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        label="Label"
      >
        <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroup.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        label="Label"
        direction="row"
      >
        <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroup.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        label="Label"
        helper="Helper content"
      >
        <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroup.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <RadioGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        label="Label"
        error="Eror content"
      >
        <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />
        <RadioGroup.Radio name="value-2" value="value-2" label="Radio 2" />
      </RadioGroup>,
    ))

  test('throws if RadioGroup.Radio used without RadioGroup', () => {
    expect(() =>
      render(
        <RadioGroup.Radio name="value-1" value="value-1" label="Radio 1" />,
      ),
    ).toThrow('RadioGroup.Radio can only be used inside a RadioGroup')
  })
})
