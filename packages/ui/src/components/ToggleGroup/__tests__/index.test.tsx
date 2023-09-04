import { describe, expect, test } from '@jest/globals'
import { render } from '@testing-library/react'
import { ToggleGroup } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('ToggleGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup onChange={() => {}} name="Toggle" legend="Label">
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />
        <ToggleGroup.Toggle name="value-2" value="value-2" label="Toggle 2" />
      </ToggleGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        onChange={() => {}}
        name="Toggle"
        legend="Label"
        direction="row"
      >
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />
        <ToggleGroup.Toggle name="value-2" value="value-2" label="Toggle 2" />
      </ToggleGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        onChange={() => {}}
        name="Toggle"
        legend="Label"
        helper="Helper content"
      >
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />
        <ToggleGroup.Toggle name="value-2" value="value-2" label="Toggle 2" />
      </ToggleGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        onChange={() => {}}
        name="Toggle"
        legend="Label"
        error="Eror content"
      >
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />
        <ToggleGroup.Toggle name="value-2" value="value-2" label="Toggle 2" />
      </ToggleGroup>,
    ))

  test('renders correctly with required prop', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup onChange={() => {}} name="Toggle" legend="Label" required>
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />
        <ToggleGroup.Toggle name="value-2" value="value-2" label="Toggle 2" />
      </ToggleGroup>,
    ))

  test('throws if ToggleGroup.Toggle used without ToggleGroup', () => {
    expect(() =>
      render(
        <ToggleGroup.Toggle name="value-1" value="value-1" label="Toggle 1" />,
      ),
    ).toThrow('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  })
})
