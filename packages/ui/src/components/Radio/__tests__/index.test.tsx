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

  it('disables the input and exposes aria-disabled', () => {
    renderWithTheme(<Radio disabled label="Choice" name="radio" onChange={() => {}} value="choice" />)
    const radio = screen.getByRole('radio', { name: 'Choice' })
    expect(radio).toBeDisabled()
    expect(radio).toHaveAttribute('aria-disabled', 'true')
  })

  it('marks the input as checked', () => {
    renderWithTheme(<Radio checked label="Choice" name="radio" onChange={() => {}} value="choice" />)
    expect(screen.getByRole('radio', { name: 'Choice' })).toBeChecked()
  })

  it('renders the error description and links it to the input', () => {
    renderWithTheme(<Radio error="Invalid value" label="Choice" name="radio" onChange={() => {}} value="choice" />)
    const radio = screen.getByRole('radio', { name: 'Choice' })
    const description = screen.getByRole('status')
    expect(description).toHaveTextContent('Invalid value')
    expect(radio).toHaveAttribute('aria-describedby', description.id)
  })

  it('renders the helper description and links it to the input at small size', () => {
    renderWithTheme(
      <Radio helper="Helper" label="Choice" name="radio" onChange={() => {}} size="small" value="choice" />,
    )
    const radio = screen.getByRole('radio', { name: 'Choice' })
    const helper = screen.getByRole('status')
    expect(helper).toHaveTextContent('Helper')
    expect(radio).toHaveAttribute('aria-describedby', helper.id)
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
