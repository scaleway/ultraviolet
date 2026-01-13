import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardGroupField } from '../..'

describe('selectableCardField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        legend="test"
        name="test"
        onChange={() => {}}
        type="radio"
        value="test"
      >
        <SelectableCardGroupField.Card label="Radio 1" value="radio 1" />
        <SelectableCardGroupField.Card label="Radio 2" value="radio 2" />
      </SelectableCardGroupField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked as radiofield', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        legend="test"
        name="test"
        type="radio"
        value="checked"
      >
        <SelectableCardGroupField.Card
          data-testid="checked"
          label="Radio 1"
          value="checked"
        />
      </SelectableCardGroupField>,
      { defaultValues: { test: 'checked' } },
    )
    const input = screen.getByLabelText('Radio 1')
    expect(input).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked as a checkbox', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        legend="test"
        name="test"
        type="checkbox"
        value={['checked']}
      >
        <SelectableCardGroupField.Card
          data-testid="checked"
          label="Checkbox 1"
          value="checked"
        />
      </SelectableCardGroupField>,
      { defaultValues: { test: 'checked' } },
    )
    const input = screen.getByLabelText('Checkbox 1')
    expect(input).toBeChecked()
    expect(asFragment()).toMatchSnapshot()
  })

  test('should trigger events correctly', async () => {
    const onChange = vi.fn(() => {})

    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        legend="test"
        name="test"
        onChange={onChange}
        type="checkbox"
        value="events"
      >
        <SelectableCardGroupField.Card label="Radio 1" value="radio 1" />
        <SelectableCardGroupField.Card label="Radio 2" value="radio 2" />
      </SelectableCardGroupField>,
    )
    const input = screen.getByLabelText('Radio 1')
    await userEvent.click(input)
    expect(onChange).toHaveBeenCalledOnce()
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(2)
    expect(asFragment()).toMatchSnapshot()
  })
})
