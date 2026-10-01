import { screen } from '@testing-library/react'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { VerificationCode } from '..'

describe('verificationCode - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'should not have violations with a label (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<VerificationCode label="Enter code" required />, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'should not have violations with accessibleLabel (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<VerificationCode accessibleLabel="Verification code" />, currentTheme)
        await expectNoViolations(container)
      },
    )
  })

  describe('single field with simulated boxes', () => {
    it('renders one single field instead of one per box', () => {
      renderWithTheme(<VerificationCode fields={4} />)
      expect(screen.getAllByRole('textbox')).toHaveLength(1)
    })

    it('hides the simulated boxes from assistive technology', () => {
      renderWithTheme(<VerificationCode fields={4} />)
      for (const boxNumber of [0, 1, 2, 3]) {
        expect(screen.getByTestId(`box-${boxNumber}`)).toHaveAttribute('aria-hidden', 'true')
      }
    })
  })

  describe('labelling (WCAG 2.4.6 / 4.1.2)', () => {
    it('uses the visible label as the accessible name', () => {
      renderWithTheme(<VerificationCode label="Enter code" />)
      expect(screen.getByRole('textbox')).toHaveAccessibleName('Enter code')
    })

    it('uses accessibleLabel as the accessible name when no label is provided', () => {
      renderWithTheme(<VerificationCode accessibleLabel="Verification code" />)
      expect(screen.getByRole('textbox')).toHaveAccessibleName('Verification code')
    })
  })

  describe('input purpose (WCAG 1.3.5)', () => {
    it('enables one-time-code autofill', () => {
      renderWithTheme(<VerificationCode />)
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'one-time-code')
    })
  })

  describe('numeric input', () => {
    it('shows the numeric keypad via inputmode on a text input', () => {
      renderWithTheme(<VerificationCode />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
      expect(screen.getByRole('textbox')).toHaveAttribute('inputmode', 'numeric')
    })
  })
})
