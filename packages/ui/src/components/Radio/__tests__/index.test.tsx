import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Radio } from '..'

describe('radio', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(<Radio label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('forwards name and value to the input', () => {
    renderWithTheme(<Radio label="Choice" name="radio" onChange={() => {}} value="choice" />)
    const radio = screen.getByRole('radio', { name: 'Choice' })
    expect(radio).toHaveAttribute('name', 'radio')
    expect(radio).toHaveAttribute('value', 'choice')
  })

  it('disables the input', () => {
    renderWithTheme(<Radio disabled label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(screen.getByRole('radio', { name: 'Choice' })).toBeDisabled()
  })

  it('marks the input as checked', () => {
    renderWithTheme(<Radio checked label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(screen.getByRole('radio', { name: 'Choice' })).toBeChecked()
  })

  it('exposes the tooltip on hover', async () => {
    renderWithTheme(<Radio label="Choice" name="radio" onChange={() => {}} tooltip="test" value="choice" />)
    await userEvent.hover(screen.getByRole('radio', { name: 'Choice' }))
    expect(await screen.findByRole('tooltip', { name: 'test' })).toBeVisible()
  })

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn()
    renderWithTheme(<Radio label="Choice" name="radio" onChange={onChange} value="choice" />)
    await userEvent.click(screen.getByRole('radio', { name: 'Choice' }))
    expect(onChange).toHaveBeenCalled()
  })
})
