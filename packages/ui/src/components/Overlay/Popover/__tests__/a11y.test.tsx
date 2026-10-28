import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Popover } from '..'

// Floating UI focuses through a rAF-deferred queue. On loaded CI runners the
// webkit instance can take well over the 1s waitFor default to reach the
// settled focus, so focus assertions wait for up to 5s instead.
const FOCUS_WAIT_TIMEOUT = 5_000

const renderPopover = (props: { visible?: boolean } = {}) =>
  renderWithTheme(
    <Popover content="Popover content" title="Popover title" {...props}>
      <button type="button">Open Popover</button>
    </Popover>,
  )

describe('popover - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    // jsdom reports an "Apple" vendor, which makes Floating UI's focus guards take
    // the Safari-only role="button" path: empty, nameless sentinels that axe flags.
    // Run as a non-Safari browser, where the guards are aria-hidden.
    const appleVendor = Object.getOwnPropertyDescriptor(navigator, 'vendor')
    beforeEach(() => {
      Object.defineProperty(navigator, 'vendor', { value: '', configurable: true })
    })
    afterEach(() => {
      if (appleVendor) {
        Object.defineProperty(navigator, 'vendor', appleVendor)
      }
    })

    // the panel is portaled to document.body, so scan the whole body
    it.for([...consoleThemesMap.entries()])(
      'should not have violations when open (theme: %s)',
      async ([, currentTheme]) => {
        renderWithTheme(
          <Popover content="Popover content" title="Popover title" visible>
            <button type="button">Open Popover</button>
          </Popover>,
          currentTheme,
        )

        await expectNoViolations(document.body)
      },
    )
  })

  describe('accessible name', () => {
    it('should label the dialog with the visible title', () => {
      renderPopover({ visible: true })

      expect(screen.getByRole('heading', { level: 2, name: 'Popover title' })).toBeVisible()
      expect(screen.getByRole('dialog')).toHaveAccessibleName('Popover title')
    })
  })

  describe('trigger ARIA', () => {
    it('should expose aria-haspopup="dialog" and reflect the open state on the trigger', async () => {
      renderPopover()

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).not.toHaveAttribute('aria-controls')

      await userEvent.click(trigger)

      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('dialog').id)
    })
  })

  describe('focus management', () => {
    it('should move focus into the dialog on open', async () => {
      renderPopover()

      await userEvent.click(screen.getByRole('button', { name: 'Open Popover' }))

      // the close button is the first focusable element of the dialog
      await waitFor(
        () => {
          const button = screen.getByRole('button', { name: 'close popover Popover title' })
          expect(button).toHaveFocus()
        },
        {
          timeout: FOCUS_WAIT_TIMEOUT,
        },
      )
    })

    it('should return focus to the trigger on Escape', async () => {
      renderPopover()
      const trigger = screen.getByRole('button', { name: 'Open Popover' })

      await userEvent.click(trigger)
      await waitFor(() => {
        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeVisible()
      })

      await userEvent.keyboard('{Escape}')

      await waitFor(
        () => {
          const dialog = screen.queryByRole('dialog')
          expect(dialog).not.toBeInTheDocument()
        },
        { timeout: FOCUS_WAIT_TIMEOUT },
      )
      expect(trigger).toHaveFocus()
    })

    it('should return focus to the trigger when closed with the close button', async () => {
      renderPopover()
      const trigger = screen.getByRole('button', { name: 'Open Popover' })

      await userEvent.click(trigger)
      await userEvent.click(screen.getByRole('button', { name: 'close popover Popover title' }))

      await waitFor(
        () => {
          const dialog = screen.queryByRole('dialog')
          expect(dialog).not.toBeInTheDocument()
        },
        { timeout: FOCUS_WAIT_TIMEOUT },
      )
      expect(trigger).toHaveFocus()
    })
  })
})
