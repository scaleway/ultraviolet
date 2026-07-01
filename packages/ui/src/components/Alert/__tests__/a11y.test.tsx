import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import type { RefObject } from 'react'
import { describe, expect, it } from 'vitest'
import { Alert } from '..'

describe('alert - A11y', { tags: ['a11y'] }, () => {
  it.for([...consoleThemesMap.entries()])(
    'should not have violations with title, button and close (theme: %s)',
    async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <Alert buttonText="More info" closable sentiment="info" title="Information">
          Sample Alert
        </Alert>,
        currentTheme,
      )

      await expectNoViolations(container)
    },
  )

  it('exposes an assertive live region for danger and warning sentiments', () => {
    const { getByRole, rerender } = renderWithTheme(<Alert sentiment="danger">Sample Alert</Alert>)

    expect(getByRole('alert')).toBeVisible()

    rerender(<Alert sentiment="warning">Sample Alert</Alert>)

    expect(getByRole('alert')).toBeVisible()
  })

  it('exposes a polite live region for info, neutral and success sentiments', () => {
    const { getByRole, rerender } = renderWithTheme(<Alert sentiment="info">Sample Alert</Alert>)

    expect(getByRole('status')).toBeVisible()

    for (const sentiment of ['neutral', 'success'] as const) {
      rerender(<Alert sentiment={sentiment}>Sample Alert</Alert>)

      expect(getByRole('status')).toBeVisible()
    }
  })

  it('associates the title with the alert container', () => {
    const { getByRole } = renderWithTheme(<Alert title="Information">Sample Alert</Alert>)

    const alert = getByRole('alert')

    expect(alert).toHaveAttribute('aria-labelledby')
    expect(document.getElementById(alert.getAttribute('aria-labelledby')!)).toHaveTextContent('Information')
  })

  it('restores focus to the previously focused element after dismiss', async () => {
    renderWithTheme(
      <>
        <button type="button">before</button>
        <Alert closable onClose={() => {}}>
          Sample Alert
        </Alert>
      </>,
    )

    const beforeButton = screen.getByRole('button', { name: 'before' })
    const closeButton = screen.getByRole('button', { name: /close/iu })

    await userEvent.tab()
    expect(beforeButton).toHaveFocus()
    await userEvent.tab()
    expect(closeButton).toHaveFocus()

    await userEvent.keyboard('{Enter}')

    expect(beforeButton).toHaveFocus()
  })

  it('moves focus to focusAfterClose when provided on dismiss', async () => {
    const fallbackRef: RefObject<HTMLElement | null> = { current: null }

    renderWithTheme(
      <>
        <button
          ref={el => {
            fallbackRef.current = el
          }}
          type="button"
        >
          trigger
        </button>
        <Alert closable focusAfterClose={fallbackRef} onClose={() => {}}>
          Sample Alert
        </Alert>
      </>,
    )

    const trigger = screen.getByRole('button', { name: 'trigger' })
    const closeButton = screen.getByRole('button', { name: /close/iu })

    await userEvent.tab()
    expect(trigger).toHaveFocus()
    await userEvent.tab()
    expect(closeButton).toHaveFocus()

    await userEvent.keyboard('{Enter}')

    expect(trigger).toHaveFocus()
  })
})
