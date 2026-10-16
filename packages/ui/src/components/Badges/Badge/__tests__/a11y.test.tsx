import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Badge } from '..'

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

    it('includes accessibleLabel in the content of a status badge', () => {
      const { getByRole } = renderWithTheme(
        <Badge role="status" accessibleLabel="Server error">
          <InformationOutlineIcon />
        </Badge>,
      )

      expect(getByRole('status')).toHaveTextContent('Server error')
    })
  })

  describe('labelling (WCAG 4.1.2)', () => {
    it('renders accessibleLabel as visually hidden text for screen readers', () => {
      const { getByText } = renderWithTheme(<Badge accessibleLabel="Server error">Sample badge</Badge>)

      expect(getByText('Server error')).toBeInTheDocument()
    })

    it('should not have violations with an icon-only badge labelled via accessibleLabel', async () => {
      const { container } = renderWithTheme(
        <Badge accessibleLabel="Server error" data-testid="badge">
          <InformationOutlineIcon />
        </Badge>,
      )

      await expectNoViolations(container)
    })
  })
})
