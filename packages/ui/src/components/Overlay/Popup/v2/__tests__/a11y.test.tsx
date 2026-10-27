import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { useRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Popup } from '..'
import { Modal } from '../../../Modal'

// Floating UI focuses through a rAF-deferred queue. On loaded CI runners the
// webkit instance can take well over the 1s waitFor default to reach the
// settled focus, so focus assertions wait for up to 5s instead.
const FOCUS_WAIT_TIMEOUT = 5_000

const renderPopup = (
  {
    rootProps = {},
    triggerEvent,
    panelProps = {},
  }: {
    rootProps?: Partial<Parameters<typeof Popup.Root>[0]>
    triggerEvent?: 'click' | 'hover'
    panelProps?: Partial<Parameters<typeof Popup.Panel>[0]>
  } = {},
  theme?: Parameters<typeof renderWithTheme>[1],
) =>
  renderWithTheme(
    <Popup.Root {...rootProps}>
      <Popup.Trigger {...(triggerEvent ? { triggerEvent } : {})}>
        <button type="button">Open</button>
      </Popup.Trigger>
      <Popup.Panel {...panelProps}>Content</Popup.Panel>
    </Popup.Root>,
    theme,
  )

describe('popup v2 - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    // the panel is portaled to document.body, so scan the whole body
    it.for([...consoleThemesMap.entries()])(
      'should not have violations when open (theme: %s)',
      async ([, currentTheme]) => {
        renderPopup({ rootProps: { defaultVisible: true }, panelProps: { accessibleLabel: 'Settings' } }, currentTheme)

        await expectNoViolations(document.body)
      },
    )
  })

  describe('trigger ARIA', () => {
    it('should open on click and set ARIA attributes on the trigger', async () => {
      renderPopup()

      const trigger = screen.getByRole('button', { name: 'Open' })
      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(trigger).not.toHaveAttribute('aria-controls')

      await userEvent.click(trigger)

      const popup = screen.getByRole('dialog')
      expect(trigger).toHaveAttribute('aria-expanded', 'true')
      expect(trigger).toHaveAttribute('aria-controls', popup.id)
      // The panel fades in via an animation, so visibility settles asynchronously.
      await waitFor(() => expect(popup).toBeVisible())
      expect(popup).toHaveTextContent('Content')

      await userEvent.click(trigger)
      // The panel plays its exit animation before unmounting.
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    })

    it('should not add a tab stop on the wrapper when the trigger is focusable', () => {
      renderPopup()
      const wrapper = screen.getByRole('button', { name: 'Open' }).parentElement
      expect(wrapper).not.toHaveAttribute('tabindex')
      expect(wrapper).not.toHaveAttribute('role')
    })

    it('should add a tab stop on the wrapper and land ARIA on it when the trigger has no focusable element', () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <span>Open</span>
          </Popup.Trigger>
          <Popup.Panel>Content</Popup.Panel>
        </Popup.Root>,
      )

      const wrapper = screen.getByText('Open').parentElement
      expect(wrapper).toHaveAttribute('tabindex', '0')
      expect(wrapper).toHaveAttribute('role', 'button')
      expect(wrapper).toHaveAttribute('aria-expanded', 'false')
      expect(wrapper).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('should derive aria-haspopup from the panel role', () => {
      renderPopup({ panelProps: { role: 'menu' } })
      expect(screen.getByRole('button', { name: 'Open' })).toHaveAttribute('aria-haspopup', 'menu')
    })
  })

  describe('keyboard and pointer', () => {
    it('should open on keyboard activation of the trigger', async () => {
      renderPopup()
      const trigger = screen.getByRole('button', { name: 'Open' })

      trigger.focus()
      await userEvent.keyboard('{Enter}')

      await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())
    })

    it('should close on Escape and return focus to the trigger', async () => {
      renderPopup()
      const trigger = screen.getByRole('button', { name: 'Open' })

      await userEvent.click(trigger)
      await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

      await userEvent.keyboard('{Escape}')
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      // Focus returns through the same deferred path as the initial focus:
      // allow for slow frames on loaded CI runners (webkit especially).
      await waitFor(() => expect(trigger).toHaveFocus(), { timeout: FOCUS_WAIT_TIMEOUT })
    })

    it('should close only the popup and not an enclosing Modal on Escape', async () => {
      const onClose = vi.fn()
      renderWithTheme(
        <Modal ariaLabel="modal-test" open onClose={onClose}>
          <Popup.Root>
            <Popup.Trigger>
              <button type="button">Open</button>
            </Popup.Trigger>
            <Popup.Panel>Content</Popup.Panel>
          </Popup.Root>
        </Modal>,
        undefined,
        { container: document.body },
      )

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await waitFor(
        () => {
          const content = screen.getByText('Content')
          expect(content).toBeVisible()
        },
        {
          timeout: FOCUS_WAIT_TIMEOUT,
        },
      )

      await userEvent.keyboard('{Escape}')

      await waitFor(() => expect(screen.queryByText('Content')).not.toBeInTheDocument())
      expect(onClose).not.toHaveBeenCalled()

      // The Modal listens for Escape keyup on its dialog element, so the keyup
      // must originate inside the modal. Focus returns to the trigger through
      // Floating UI's rAF-deferred queue, which can lag behind the unmount on
      // loaded webkit runners — press only once focus is back inside.
      await waitFor(() => expect(screen.getByRole('button', { name: 'Open' })).toHaveFocus(), {
        timeout: FOCUS_WAIT_TIMEOUT,
      })

      await userEvent.keyboard('{Escape}')
      expect(onClose).toHaveBeenCalledOnce()
    })

    it('should close after an outside click and return focus to the trigger', async () => {
      renderPopup()
      const trigger = screen.getByRole('button', { name: 'Open' })

      await userEvent.click(trigger)
      await waitFor(
        async () => {
          const dialog = screen.getByRole('dialog')
          expect(dialog).toBeVisible()
        },
        { timeout: FOCUS_WAIT_TIMEOUT },
      )

      await userEvent.click(document.body)
      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      // Focus returns through the same deferred path as the initial focus:
      // allow for slow frames on loaded CI runners (webkit especially).
      await waitFor(() => expect(trigger).toHaveFocus(), { timeout: FOCUS_WAIT_TIMEOUT })
    })
  })

  describe('accessible name', () => {
    it('should name the dialog via a visually hidden element wired with aria-labelledby', async () => {
      renderPopup({ panelProps: { accessibleLabel: 'Settings' } })
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(screen.getByRole('dialog')).toHaveAccessibleName('Settings')
      expect(screen.getByText('Settings')).toBeVisuallyHidden()
    })

    it('should not add aria-labelledby when no label is passed', async () => {
      renderPopup()
      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-labelledby')
    })
  })

  describe('focus management', () => {
    it('should move focus to the first focusable element by default', async () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <button type="button">Open</button>
          </Popup.Trigger>

          <Popup.Panel>
            <button type="button">First</button>
          </Popup.Panel>
        </Popup.Root>,
      )

      const trigger = screen.getByRole('button', { name: 'Open' })
      await userEvent.click(trigger)

      // Floating UI lands the initial focus on the next animation frame.
      // WebKit on a loaded CI runner can take over a second to reach it, so
      // the assertion needs more headroom than the 1s default to observe the
      // settled state instead of the transient one.
      await waitFor(() => expect(screen.getByRole('button', { name: 'First' })).toHaveFocus(), {
        timeout: FOCUS_WAIT_TIMEOUT,
      })
    })

    it('should move focus to the initialFocus element when specified', async () => {
      const PopupWithInitialFocus = () => {
        const focusTarget = useRef<HTMLButtonElement>(null)
        return (
          <Popup.Root>
            <Popup.Trigger>
              <button type="button">Open</button>
            </Popup.Trigger>

            <Popup.Panel initialFocus={focusTarget}>
              <button type="button">First</button>
              <button ref={focusTarget} type="button">
                Second
              </button>
            </Popup.Panel>
          </Popup.Root>
        )
      }

      renderWithTheme(<PopupWithInitialFocus />)

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      await waitFor(() => expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus(), {
        timeout: FOCUS_WAIT_TIMEOUT,
      })
    })

    it('should keep focus on the trigger when initialFocus is -1', async () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <button type="button">Open</button>
          </Popup.Trigger>

          <Popup.Panel initialFocus={-1}>
            <button type="button">First</button>
          </Popup.Panel>
        </Popup.Root>,
      )

      const trigger = screen.getByRole('button', { name: 'Open' })
      await userEvent.click(trigger)

      expect(trigger).toHaveFocus()
      expect(screen.getByRole('button', { name: 'First' })).not.toHaveFocus()
    })

    it('should move focus to the tabbable index when initialFocus is a number', async () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <button type="button">Open</button>
          </Popup.Trigger>

          <Popup.Panel initialFocus={1}>
            <button type="button">First</button>
            <button type="button">Second</button>
          </Popup.Panel>
        </Popup.Root>,
      )

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      await waitFor(() => expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus(), {
        timeout: FOCUS_WAIT_TIMEOUT,
      })
    })

    it('should not move focus into the panel when returnFocus is false', async () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <button type="button">Open</button>
          </Popup.Trigger>

          <Popup.Panel returnFocus={false}>
            <button type="button">First</button>
          </Popup.Panel>
        </Popup.Root>,
      )

      const trigger = screen.getByRole('button', { name: 'Open' })
      await userEvent.click(trigger)

      expect(trigger).toHaveFocus()
      expect(screen.getByRole('button', { name: 'First' })).not.toHaveFocus()
    })

    it('should move focus to the dialog itself when the panel has no focusable content', async () => {
      renderPopup()

      const trigger = screen.getByRole('button', { name: 'Open' })
      await userEvent.click(trigger)

      await waitFor(() => expect(screen.getByRole('dialog')).toHaveFocus(), {
        timeout: FOCUS_WAIT_TIMEOUT,
      })
    })
  })

  describe('focus trap', () => {
    // jsdom/user-event compute their own tabbable list and ignore the Floating UI
    // focus guards, so they cannot reproduce the browser Tab cycling. The modal
    // trap is observable instead through the outside content being hidden to AT.
    it('should hide everything outside the panel from assistive tech when focusTrap is true', async () => {
      renderWithTheme(
        <Popup.Root>
          <Popup.Trigger>
            <button type="button">Open</button>
          </Popup.Trigger>

          <Popup.Panel focusTrap>
            <button type="button">First</button>
            <button type="button">Second</button>
          </Popup.Panel>

          <button type="button">Outside</button>
        </Popup.Root>,
      )

      expect(screen.getByRole('button', { name: 'Outside' })).toBeInTheDocument()

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(screen.getByRole('button', { name: 'First' })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Outside' })).not.toBeInTheDocument()
    })
  })
})
