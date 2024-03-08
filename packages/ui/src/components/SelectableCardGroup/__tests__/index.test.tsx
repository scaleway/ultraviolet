import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react'
import { SelectableCardGroup } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('SelectableCardGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
      >
        <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardGroup>,
    ))

  test('renders correctly with direction multiple columns', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        columns={2}
        type="checkbox"
      >
        <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
        helper="Helper content"
      >
        <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly required and showTick', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
        required
        showTick
      >
        <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        error="Error content"
        type="checkbox"
      >
        <SelectableCardGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly as a radio', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
        error="Error content"
        type="radio"
      >
        <SelectableCardGroup.Card value="value-1" label="Radio 1" />
        <SelectableCardGroup.Card value="value-2" label="Radio 2" />
      </SelectableCardGroup>,
    ))

  test('throws if SelectableCardGroup.Card sed without SelectableCardGroup', () => {
    expect(() =>
      render(<SelectableCardGroup.Card value="value-1" label="Checkbox 1" />),
    ).toThrow(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  })
})
