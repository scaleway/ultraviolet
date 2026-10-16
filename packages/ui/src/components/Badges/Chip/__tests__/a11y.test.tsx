import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Chip } from '..'

describe('chip - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'should not have violations with default chip (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Chip>test</Chip>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'should not have violations with active chip (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Chip active>test</Chip>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'should not have violations with disabled chip (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Chip disabled>test</Chip>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'should not have violations with closable chip (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(
          <Chip
            onClose={() => {
              /* empty */
            }}
          >
            test
          </Chip>,
          currentTheme,
        )
        await expectNoViolations(container)
      },
    )
  })

  describe('toggle button semantics (WCAG 4.1.2)', () => {
    it('exposes the chip as a button with aria-pressed reflecting the active state', () => {
      renderWithTheme(<Chip active>test</Chip>)

      const chip = screen.getByRole('button', { name: 'test' })
      expect(chip).toHaveAttribute('aria-pressed', 'true')
    })

    it('exposes the inactive state with aria-pressed=false', () => {
      renderWithTheme(<Chip>test</Chip>)

      const chip = screen.getByRole('button', { name: 'test' })
      expect(chip).toHaveAttribute('aria-pressed', 'false')
    })

    it('uses the native disabled attribute for the disabled state', () => {
      renderWithTheme(<Chip disabled>test</Chip>)

      const chip = screen.getByRole('button', { name: 'test' })
      expect(chip).toBeDisabled()
    })
  })

  describe('keyboard operability (WCAG 2.1.1)', () => {
    it('is focusable and toggles the active state with the keyboard', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Chip>test</Chip>)

      const chip = screen.getByRole('button', { name: 'test' })
      await user.tab()
      expect(chip).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(chip).toHaveAttribute('aria-pressed', 'true')

      await user.keyboard('{ }')
      expect(chip).toHaveAttribute('aria-pressed', 'false')
    })

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Chip disabled>test</Chip>)

      const chip = screen.getByRole('button', { name: 'test' })
      await user.tab()
      expect(chip).not.toHaveFocus()
      expect(chip).toHaveAttribute('aria-pressed', 'false')
    })
  })

  describe('close button', () => {
    it('provides an accessible name for the close button', () => {
      renderWithTheme(
        <Chip
          closeAccessibleLabel="Close chip"
          onClose={() => {
            /* empty */
          }}
        >
          test
        </Chip>,
      )

      expect(screen.getByRole('button', { name: 'Close chip' })).toBeInTheDocument()
    })

    it('uses a default accessible name when closeAccessibleLabel is not provided', () => {
      renderWithTheme(
        <Chip
          onClose={() => {
            /* empty */
          }}
        >
          test
        </Chip>,
      )

      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    })
  })
})
