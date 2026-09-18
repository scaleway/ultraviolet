import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Tag } from '..'

describe('tag - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])(
      'copiable should not have violations (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Tag copiable>test</Tag>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'removable should not have violations (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Tag onClose={() => {}}>test</Tag>, currentTheme)
        await expectNoViolations(container)
      },
    )

    it.for([...consoleThemesMap.entries()])(
      'key-value should not have violations (theme: %s)',
      async ([, currentTheme]) => {
        const { container } = renderWithTheme(<Tag keyValue={{ key: 'key', value: 'value' }} />, currentTheme)
        await expectNoViolations(container)
      },
    )

    it('disabled copiable should not have violations', async () => {
      const { container } = renderWithTheme(
        <Tag copiable disabled>
          test
        </Tag>,
      )
      await expectNoViolations(container)
    })
  })

  describe('status message (WCAG 4.1.3)', () => {
    it('announces the copied feedback in a status live region', async () => {
      const user = userEvent.setup()
      renderWithTheme(<Tag copiable>test</Tag>)

      const copyButton = screen.getByRole('button', { name: 'test' })
      await user.click(copyButton)

      expect(screen.getByRole('status')).toHaveTextContent('Copied!')
    })
  })

  describe('disabled state', () => {
    it('announces the disabled state on a non-copiable tag', () => {
      const { container } = renderWithTheme(<Tag disabled>test</Tag>)

      expect(container.querySelector('[aria-disabled="true"]')).toHaveTextContent('test')
    })

    it('does not expose aria-disabled when not disabled', () => {
      const { container } = renderWithTheme(<Tag>test</Tag>)

      expect(container.querySelector('[aria-disabled]')).not.toBeInTheDocument()
    })

    it('uses the native disabled attribute on a copiable tag', () => {
      renderWithTheme(
        <Tag copiable disabled>
          test
        </Tag>,
      )

      const button = screen.getByRole('button', { name: 'test' })
      expect(button).toBeDisabled()
      expect(button).not.toHaveAttribute('aria-disabled')
    })
  })
})
