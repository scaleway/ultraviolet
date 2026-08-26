import { screen } from '@testing-library/react'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { AddressIcon, ArrowDownIcon, InformationIcon, LeftRightArrowIcon } from '../__generated__'

describe('icon - A11y', { tags: ['a11y'] }, () => {
  it('should be aria-hidden and expose no accessible name by default (decorative)', async () => {
    const { container } = renderWithTheme(<ArrowDownIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
    await expectNoViolations(container)
  })

  it('should be informative with role="img" and an accessible name when accessibleLabel is provided', async () => {
    const { container } = renderWithTheme(<LeftRightArrowIcon accessibleLabel="Arrow" />)
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('role', 'img')
    expect(svg).toHaveAttribute('aria-hidden', 'false')
    expect(svg).toHaveAccessibleName('Arrow')
    await expectNoViolations(container)
  })

  it('should be informative with role="img" and an accessible name when aria-labelledby is provided', async () => {
    const { container } = renderWithTheme(
      <div>
        <InformationIcon aria-labelledby="ex" />
        <p id="ex">Info</p>
      </div>,
    )
    const svg = screen.getByRole('img')
    expect(svg).toHaveAttribute('role', 'img')
    expect(svg).toHaveAttribute('aria-hidden', 'false')
    expect(svg).toHaveAccessibleName('Info')
    await expectNoViolations(container)
  })

  it('should not expose the technical component name as an accessible name', async () => {
    const { container } = renderWithTheme(<AddressIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAccessibleName()
    await expectNoViolations(container)
  })
})
