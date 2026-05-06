import { render } from '@testing-library/react'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'

import { CheckboxGroup } from '..'

describe('checkboxGroup', () => {
  it('renders correctly', () =>
    shouldMatchSnapshot(
      <CheckboxGroup legend="Label" name="Checkbox" onChange={() => {}}>
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox name="value-2" value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  it('renders correctly with no CheckboxGroup.Checkbox name', () =>
    shouldMatchSnapshot(
      <CheckboxGroup legend="Label" name="Checkbox" onChange={() => {}}>
        <CheckboxGroup.Checkbox value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>
        <CheckboxGroup.Checkbox value="value-2">
          Checkbox 2
        </CheckboxGroup.Checkbox>
      </CheckboxGroup>,
    ))

  it('renders correctly with direction row', () =>
    shouldMatchSnapshot(
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

  it('renders correctly with helper content', () =>
    shouldMatchSnapshot(
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

  it('renders correctly with error content', () =>
    shouldMatchSnapshot(
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

  it('renders correctly with required prop', () =>
    shouldMatchSnapshot(
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

  it('throws if CheckboxGroup.Checkbox used without CheckboxGroup', () => {
    expect(() =>
      render(
        <CheckboxGroup.Checkbox name="value-1" value="value-1">
          Checkbox 1
        </CheckboxGroup.Checkbox>,
      ),
    ).toThrow('CheckboxGroup.Checkbox can only be used inside a CheckboxGroup')
  })
})
