import { render } from '@testing-library/react'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { ToggleGroup } from '..'

describe('ToggleGroup', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup legend="Label" name="Toggle" onChange={() => {}}>
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        direction="row"
        legend="Label"
        name="Toggle"
        onChange={() => {}}
      >
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('renders correctly with helper content', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        helper="Helper content"
        legend="Label"
        name="Toggle"
        onChange={() => {}}
      >
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('renders correctly with error content', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup
        error="Eror content"
        legend="Label"
        name="Toggle"
        onChange={() => {}}
      >
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('renders correctly with required prop', () =>
    shouldMatchEmotionSnapshot(
      <ToggleGroup legend="Label" name="Toggle" onChange={() => {}} required>
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('throws if ToggleGroup.Toggle used without ToggleGroup', () => {
    expect(() =>
      render(
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />,
      ),
    ).toThrow('ToggleGroup.Toggle can only be used inside a ToggleGroup')
  })
})
