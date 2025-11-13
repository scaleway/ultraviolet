import { render } from '@testing-library/react'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { ToggleGroup } from '..'

describe('toggleGroup', () => {
  test('renders correctly', () =>
    shouldMatchSnapshot(
      <ToggleGroup legend="Label" name="Toggle" onChange={() => {}}>
        <ToggleGroup.Toggle label="Toggle 1" name="value-1" value="value-1" />
        <ToggleGroup.Toggle label="Toggle 2" name="value-2" value="value-2" />
      </ToggleGroup>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
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
