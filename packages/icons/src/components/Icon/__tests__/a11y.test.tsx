import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { AddressIcon } from '../__generated__'
import { Icon } from '../Icon'

describe('icon - A11y', { tags: ['a11y'] }, () => {
  it('should be aria-hidden and expose no accessible name by default (decorative)', async () => {
    const { container } = renderWithTheme(
      <Icon>
        <path d="M0 0h16v16H0z" />
      </Icon>,
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAttribute('role')
    await expectNoViolations(container)
  })

  it('should be informative with role="img" and an accessible name when accessibleLabel is provided', async () => {
    const { container } = renderWithTheme(
      <Icon accessibleLabel="Right arrow">
        <path d="M0 0h16v16H0z" />
      </Icon>,
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('role', 'img')
    expect(svg).not.toHaveAttribute('aria-hidden', 'true')
    expect(svg).toHaveAccessibleName('Right arrow')
    await expectNoViolations(container)
  })

  it('should not be focusable (focusable="false")', () => {
    const { container } = renderWithTheme(
      <Icon>
        <path d="M0 0h16v16H0z" />
      </Icon>,
    )
    expect(container.querySelector('svg')).toHaveAttribute('focusable', 'false')
  })

  it('should not expose the technical component name as an accessible name', () => {
    const { container } = renderWithTheme(<AddressIcon />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg).not.toHaveAccessibleName()
  })
})
