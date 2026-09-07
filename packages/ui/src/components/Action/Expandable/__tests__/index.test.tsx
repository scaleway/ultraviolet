import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Expandable } from '..'

describe('expandable', () => {
  it('locks the default render DOM', () => {
    const { asFragment } = renderWithTheme(<Expandable>Sample Expandable</Expandable>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders its children', () => {
    renderWithTheme(<Expandable>Sample Expandable</Expandable>)
    expect(screen.getByText('Sample Expandable')).toBeInTheDocument()
  })

  it('hides children when closed without animation', () => {
    renderWithTheme(
      <Expandable animationDuration={0} data-testid="expandable">
        Sample Expandable
      </Expandable>,
    )
    expect(screen.getByTestId('expandable')).toHaveStyle({ display: 'none' })
  })

  it('shows children when opened without animation', () => {
    renderWithTheme(
      <Expandable opened animationDuration={0} data-testid="expandable">
        Sample Expandable
      </Expandable>,
    )
    expect(screen.getByTestId('expandable')).not.toHaveStyle({ display: 'none' })
  })

  it('applies minHeight when closed without animation', () => {
    renderWithTheme(
      <Expandable animationDuration={0} minHeight={5} data-testid="expandable">
        Sample Expandable
      </Expandable>,
    )
    expect(screen.getByTestId('expandable')).toHaveStyle({ minHeight: '5px' })
  })

  it('applies a custom className', () => {
    renderWithTheme(
      <Expandable className="custom" data-testid="expandable">
        Sample Expandable
      </Expandable>,
    )
    expect(screen.getByTestId('expandable')).toHaveClass('custom')
  })

  it('keeps children visible when opened with animation', () => {
    renderWithTheme(
      <Expandable opened animationDuration={500}>
        Sample Expandable
      </Expandable>,
    )
    expect(screen.getByText('Sample Expandable')).toBeInTheDocument()
  })
})
