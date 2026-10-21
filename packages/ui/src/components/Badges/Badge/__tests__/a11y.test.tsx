import { screen } from '@testing-library/react'
import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Badge } from '..'
import { VisuallyHidden } from '../../../Other/VisuallyHidden'

describe('badge - A11y', { tags: ['a11y'] }, () => {
  it.for([...consoleThemesMap.entries()])(
    'should not have violations with default props (theme: %s)',
    async ([, currentTheme]) => {
      const { container } = renderWithTheme(<Badge>Sample badge</Badge>, currentTheme)

      await expectNoViolations(container)
    },
  )

  describe('semantic role (WCAG 1.3.1)', () => {
    it('renders a status role when provided', () => {
      const { getByRole } = renderWithTheme(<Badge role="status">Sample badge</Badge>)

      expect(getByRole('status')).toBeInTheDocument()
    })

    it('does not render a role by default', () => {
      const { getByTestId } = renderWithTheme(<Badge data-testid="badge">Sample badge</Badge>)

      expect(getByTestId('badge')).not.toHaveAttribute('role')
    })

    it('includes visually hidden text in the content of a status badge', () => {
      const { getByRole } = renderWithTheme(
        <Badge role="status">
          <VisuallyHidden>Server error</VisuallyHidden>
          <InformationOutlineIcon />
        </Badge>,
      )

      expect(getByRole('status')).toHaveTextContent('Server error')
      expect(screen.getByText('Server error')).toBeVisuallyHidden()
    })
  })

  describe('labelling (WCAG 4.1.2)', () => {
    it('renders visually hidden text for screen readers', () => {
      const { getByText } = renderWithTheme(
        <Badge>
          <VisuallyHidden>Server error</VisuallyHidden>Sample badge
        </Badge>,
      )

      expect(getByText('Server error')).toBeInTheDocument()
    })

    it('should not have violations with an icon-only badge labelled via VisuallyHidden', async () => {
      const { container } = renderWithTheme(
        <Badge>
          <VisuallyHidden>Server error</VisuallyHidden>
          <InformationOutlineIcon />
        </Badge>,
      )

      await expectNoViolations(container)
    })
  })
})
