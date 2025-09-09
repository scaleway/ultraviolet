import { render } from '@testing-library/react'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { CheckboxGroup } from '..'

describe('checkboxGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup legend="Label" name="Checkbox" onChange={() => {}}>
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with no CheckboxGroup.Checkbox name', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup legend="Label" name="Checkbox" onChange={() => {}}>
        <CheckboxGroup.Checkbox value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        direction="row"
        legend="Label"
        name="Checkbox"
        onChange={() => {}}
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        helper="Helper content"
        legend="Label"
        name="Checkbox"
        onChange={() => {}}
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        error="Eror content"
        legend="Label"
        name="Checkbox"
        onChange={() => {}}
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('renders correctly with required prop', () =>
    shouldMatchEmotionSnapshot(
      <CheckboxGroup
        legend="Label"
        name="Checkbox"
        onChange={() => {}}
        required
      >
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  test('throws if CheckboxGroup.Checkbox used without CheckboxGroup', () => {
    expect(() =>
      render(
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>,
      ),
    ).toThrow('CheckboxGroup.Checkbox can only be used inside a CheckboxGroup')
  })
})
