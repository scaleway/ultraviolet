import { render } from '@testing-library/react'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SelectableCardOptionGroup } from '..'

describe('SelectableCardGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardOptionGroup>,
    ))

  test('renders correctly with direction multiple columns', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        columns={2}
        type="checkbox"
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardOptionGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
        helper="Helper content"
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardOptionGroup>,
    ))
  test('renders correctly required and showTick', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        type="checkbox"
        required
        showTick
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardOptionGroup>,
    ))
  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value={['value-1']}
        onChange={() => {}}
        name="checkbox"
        legend="Label"
        error="Error content"
        type="checkbox"
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Checkbox 2" />
      </SelectableCardOptionGroup>,
    ))
  test('renders correctly as a radio', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCardOptionGroup
        value="value-1"
        onChange={() => {}}
        name="radio"
        legend="Label"
        error="Error content"
        type="radio"
      >
        <SelectableCardOptionGroup.Card value="value-1" label="Radio 1" />
        <SelectableCardOptionGroup.Card value="value-2" label="Radio 2" />
      </SelectableCardOptionGroup>,
    ))

  test('throws if SelectableCardGroup.Card sed without SelectableCardGroup', () => {
    expect(() =>
      render(
        <SelectableCardOptionGroup.Card value="value-1" label="Checkbox 1" />,
      ),
    ).toThrow(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  })
})
