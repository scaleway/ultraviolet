import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { RadioGroup } from '..'

describe('radioGroup', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(
      <RadioGroup legend="Group legend" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the legend and exposes each option as a radio', () => {
    const { container } = renderWithTheme(
      <RadioGroup legend="Group legend" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(screen.getByText('Group legend')).toBeInTheDocument()
    expect(container.querySelector('fieldset')).toBeInTheDocument()
    expect(screen.getAllByRole('radio')).toHaveLength(2)
    expect(screen.getByRole('radio', { name: 'Radio 1' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Radio 2' })).not.toBeChecked()
  })

  it('lays out options in a row and keeps them queryable', () => {
    renderWithTheme(
      <RadioGroup direction="row" legend="Group legend" name="radio" onChange={() => {}} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    expect(screen.getByRole('radio', { name: 'Radio 1' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Radio 2' })).not.toBeChecked()
  })

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn()
    renderWithTheme(
      <RadioGroup legend="Group legend" name="radio" onChange={onChange} value="value-1">
        <RadioGroup.Radio label="Radio 1" value="value-1" />
        <RadioGroup.Radio label="Radio 2" value="value-2" />
      </RadioGroup>,
    )
    await userEvent.click(screen.getByRole('radio', { name: 'Radio 2' }))
    expect(onChange).toHaveBeenCalled()
  })

  it('throws if RadioGroup.Radio used without RadioGroup', () => {
    expect(() => renderWithTheme(<RadioGroup.Radio label="Radio 1" value="value-1" />)).toThrow(
      'RadioGroup.Radio can only be used inside a RadioGroup',
    )
  })
})
