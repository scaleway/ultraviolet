import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SelectableCardGroupField } from '../..'

describe('SelectableCardField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        name="test"
        value="test"
        legend="test"
        onChange={() => {}}
      >
        <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
        <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
      </SelectableCardGroupField>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly checked as radiofield', () => {
    const { asFragment } = renderWithForm(
      <SelectableCardGroupField
        name="test"
        value="checked"
        legend="test"
        type="radio"
      >
        <SelectableCardGroupField.Card
          value="checked"
          label="Radio 1"
          data-testid="checked"
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
        name="test"
        value={['checked']}
        legend="test"
        type="checkbox"
      >
        <SelectableCardGroupField.Card
          value="checked"
          label="Checkbox 1"
          data-testid="checked"
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
        name="test"
        value="events"
        onChange={onChange}
        legend="test"
        type="checkbox"
      >
        <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
        <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
      </SelectableCardGroupField>,
    )
    const input = screen.getByLabelText('Radio 1')
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(1)
    await userEvent.click(input)
    expect(onChange).toBeCalledTimes(2)
    expect(asFragment()).toMatchSnapshot()
  })
})
