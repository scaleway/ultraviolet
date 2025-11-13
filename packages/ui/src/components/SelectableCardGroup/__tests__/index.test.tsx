import { render } from '@testing-library/react'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { SelectableCardGroup } from '..'

describe('selectableCardGroup', () => {
  test('renders correctly', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        legend="Label"
        name="checkbox"
        onChange={() => {}}
        type="checkbox"
        value={['value-1']}
      >
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    ))

  test('renders correctly with direction multiple columns', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        columns={2}
        legend="Label"
        name="checkbox"
        onChange={() => {}}
        type="checkbox"
        value={['value-1']}
      >
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        helper="Helper content"
        legend="Label"
        name="checkbox"
        onChange={() => {}}
        type="checkbox"
        value={['value-1']}
      >
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly required and showTick', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        legend="Label"
        name="checkbox"
        onChange={() => {}}
        required
        showTick
        type="checkbox"
        value={['value-1']}
      >
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly with error content', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        error="Error content"
        legend="Label"
        name="checkbox"
        onChange={() => {}}
        type="checkbox"
        value={['value-1']}
      >
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    ))
  test('renders correctly as a radio', () =>
    shouldMatchSnapshot(
      <SelectableCardGroup
        error="Error content"
        legend="Label"
        name="radio"
        onChange={() => {}}
        type="radio"
        value="value-1"
      >
        <SelectableCardGroup.Card label="Radio 1" value="value-1" />
        <SelectableCardGroup.Card label="Radio 2" value="value-2" />
      </SelectableCardGroup>,
    ))

  test('throws if SelectableCardGroup.Card is used without SelectableCardGroup', () => {
    expect(() =>
      render(<SelectableCardGroup.Card label="Checkbox 1" value="value-1" />),
    ).toThrow(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  })
})
