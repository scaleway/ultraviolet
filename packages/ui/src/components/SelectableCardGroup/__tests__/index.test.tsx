import { render, screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { SelectableCardGroup } from '..'

describe('selectableCardGroup', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardGroup legend="Label" name="checkbox" onChange={() => {}} type="checkbox" value={['value-1']}>
        <SelectableCardGroup.Card label="Checkbox 1" value="value-1" />
        <SelectableCardGroup.Card label="Checkbox 2" value="value-2" />
      </SelectableCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with direction multiple columns', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with helper content', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly required and showTick', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error content', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly as a radio', () => {
    const { asFragment } = renderWithTheme(
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
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('throws if SelectableCardGroup.Card is used without SelectableCardGroup', () => {
    expect(() => render(<SelectableCardGroup.Card label="Checkbox 1" value="value-1" />)).toThrow(
      'SelectableCardGroup.Card can only be used inside a SelectableCardGroup',
    )
  })

  it('renders correctly with Label component and badge', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardGroup legend="Label" name="radio" onChange={() => {}} type="radio" value="value-1">
        <SelectableCardGroup.Card
          label={
            <SelectableCardGroup.Label
              label="Option avec Badge"
              labelDescription="Description"
              badgeText="Nouveau"
              badgeSentiment="primary"
            />
          }
          value="value-1"
        />
      </SelectableCardGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Label with sideText', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardGroup legend="Label" name="radio" onChange={() => {}} type="radio" value="value-1">
        <SelectableCardGroup.Card
          label={<SelectableCardGroup.Label label="Option" badgeText="Populaire" sideText="5€" />}
          value="value-1"
        />
      </SelectableCardGroup>,
    )

    expect(screen.getByText('Option')).toBeInTheDocument()
    expect(screen.getByText('Populaire')).toBeInTheDocument()
    expect(screen.getByText('5€')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders Label with function as labelDescription', () => {
    const { asFragment } = renderWithTheme(
      <SelectableCardGroup legend="Label" name="radio" onChange={() => {}} type="radio" value="value-1">
        <SelectableCardGroup.Card
          label={
            <SelectableCardGroup.Label
              label="Option"
              labelDescription={<span>Custom description</span>}
              badgeText="Test"
            />
          }
          value="value-1"
        />
      </SelectableCardGroup>,
    )

    expect(screen.getByText('Option')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
